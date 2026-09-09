# opencodex 排障修复清单

> 症状先行：先对号入座，再按步骤执行。所有命令在 PowerShell 或 Git Bash 中运行（`ocx` 已在 PATH 中；若没有，用完整路径 `%USERPROFILE%\AppData\Roaming\npm\ocx.cmd`）。

---

## 一、症状对号入座

| 症状 | 大概率原因 | 跳转 |
|---|---|---|
| Codex 所有请求都报 `502 Bad Gateway`，`url: http://127.0.0.1:10100/...` | 本地代理进程死了，10100 端口无人监听 | → 流程 A |
| Codex 间歇性 502、反复"重新连接"，但过一阵能恢复 | OpenAI 上游服务端抖动（转发后 ~21 秒超时失败） | → 流程 B |
| 代理用着用着就没了（过几天必死一次） | Bun 1.3.14 Windows 上游内存/崩溃 bug | → 流程 C |
| 模型列表不对 / 模型调用 400 | 模型目录过期或 provider 配置变了 | → 流程 D |
| OAuth 登录失效、401 | auth.json 过期 | → 流程 E |

---

## 二、通用诊断三步（30 秒定位）

```bash
ocx status      # 看代理是否在跑、端口、PID
ocx health      # 健康检查，exit 0 = 正常
ocx doctor      # 全面诊断：路径/网络/内存/OAuth/上游连通性
```

解读要点：
- `status` 显示 **Proxy: not running** → 走流程 A
- `status` 正常但 Codex 仍报错 → 看 `doctor` 里的 **WHAM reachability**（上游是否 200）
- `doctor` 全绿但问题仍在 → 查日志定位（见第四节）

---

## 三、修复流程

### 流程 A：代理进程死亡（全灭 502）

```bash
# 1. 一键拉起（自动恢复 Codex 状态、同步模型目录）
ocx ensure

# 2. 验证
curl http://127.0.0.1:10100/healthz
# 期望返回: {"status":"ok",...}

# 3. 如果 ensure 失败，改用重启
ocx restart
```

**根治（防再犯）**：安装后台服务，崩溃自动拉起、开机自启

```powershell
# 必须以管理员身份运行 PowerShell（普通权限会报 WINDOWS_SCHTASKS_CREATE_ACCESS_DENIED）
ocx service install

# 验证
ocx service status
```

### 流程 B：上游 502 / 频繁重连（代理本身健康）

1. 先确认是上游问题：`ocx doctor` 看 `WHAM reachability`，或查日志里 502 记录耗时是否都在 ~21 秒（这是上游超时特征，不是本地问题）
2. **不需要修任何东西** —— OpenAI 服务端抖动，等 5–15 分钟自愈
3. Codex 里重试几次通常能恢复；持续超过 30 分钟可查 OpenAI 状态页
4. 如果 502 全部集中在某一个模型（如 `gpt-5.6-sol`），换用目录里其他模型试试

### 流程 C：代理反复崩溃（Bun 内存 bug）

```bash
# 1. 升级到最新版（新版可能捆绑修复后的 Bun 运行时）
ocx update

# 2. 确认后台服务已装（崩了自动拉起）——见流程 A 第 3 步

# 3. 观察内存趋势（正常应远低于 4096MB 看门狗阈值）
ocx doctor   # 看 Memory / runtime 段的 rss
```

注意：doctor 若提示 `eager-relay` 选项，**不要开** —— 官方标注在此运行时有崩溃风险。

### 流程 D：模型目录问题

```bash
ocx sync              # 重新从 providers 拉模型并注入 Codex 配置
ocx sync-cache        # 刷新 Codex 模型缓存
```

### 流程 E：登录失效

```bash
ocx login <provider>     # 重新 OAuth 登录（如 ocx login openai）
ocx doctor               # 验证 WHAM reachability 恢复 200 authenticated
```

---

## 四、日志位置（需要深究时）

| 文件 | 内容 |
|---|---|
| `~/.opencodex/crash.log` | Bun 崩溃/abort 事件（`benign-abort-teardown` = 无害中断，"proxy unaffected" 不用管） |
| `ocx observe logs` | 请求级日志：时间戳 / HTTP 状态码 / 模型 / 耗时 |
| `~/.opencodex/usage.jsonl` | 结构化用量记录（含 requestId、provider、会话 ID） |
| `~/.opencodex/ocx.pid` + `runtime-port.json` | 当前进程 PID 与端口 |

日志状态码速查：
- `200` 正常
- `400` 请求参数/模型问题 → 流程 D
- `401/403` 认证问题 → 流程 E
- `499` 客户端中断（含 Bun abort bug 的超长挂起）
- `502` + 耗时 ~21s = 上游问题 → 流程 B；**连健康检查都不通** = 进程死了 → 流程 A

---

## 五、一页纸应急版

```bash
ocx status          # 死了？
ocx ensure          # 拉起
ocx health          # 确认
# 还不行 → ocx doctor 看哪项红 → 按第三节对应流程修
# 经常死 → 管理员 PowerShell 跑 ocx service install + ocx update
```

---

## 六、快捷命令别名（PowerShell 函数）

把下面这段追加到你的 PowerShell 配置文件（执行 `notepad $PROFILE` 打开，文件不存在就先 `New-Item -Path $PROFILE -ItemType File -Force`）：

```powershell
# ===== opencodex 快捷命令 =====

# ocx-check：日常体检（状态 + 健康检查 + 端口实测）
function ocx-check {
    ocx status
    ocx health
    Write-Host "`n--- 端口实测 ---" -ForegroundColor Cyan
    try {
        $r = Invoke-RestMethod -Uri "http://127.0.0.1:10100/healthz" -TimeoutSec 5
        Write-Host "healthz: $($r.status) (pid $($r.pid), uptime $([math]::Round($r.uptime))s)" -ForegroundColor Green
    } catch {
        Write-Host "healthz: 不可达 —— 跑 ocx-fix 修复" -ForegroundColor Red
    }
}

# ocx-fix：一键修复（拉起代理 → 同步模型 → 验证）
function ocx-fix {
    Write-Host ">>> ocx ensure (拉起代理并恢复 Codex 状态)" -ForegroundColor Cyan
    ocx ensure
    Write-Host "`n>>> ocx sync (同步模型目录)" -ForegroundColor Cyan
    ocx sync
    Write-Host "`n>>> 验证" -ForegroundColor Cyan
    ocx health
}

# ocx-errors：只看最近的错误请求（4xx/5xx）
function ocx-errors {
    ocx observe logs | Select-String -Pattern " (4|5)\d\d " | Select-Object -Last 20
}

# ocx-doctor：完整体检（网络/内存/OAuth/上游连通性）
function ocx-doctor { ocx doctor }
# ===== 结束 =====
```

生效方式：保存后重开 PowerShell，或执行 `. $PROFILE` 立即加载。

| 命令 | 作用 |
|---|---|
| `ocx-check` | 日常体检：状态 + 健康 + 端口实测，出问题会提示下一步 |
| `ocx-fix` | 一键修复：ensure + sync + 验证（对应流程 A + D） |
| `ocx-errors` | 只看最近 20 条错误请求，快速判断是上游 502 还是本地问题 |
| `ocx-doctor` | 完整体检 |

---

*最后更新：2026-08-05，基于 opencodex 2.10.0 / Codex 0.146.0 实际排障整理*
