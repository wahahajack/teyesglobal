
# CC4系列产品参数更新计划

根据您提供的规格对比图，我将对 `src/data/products.ts` 中的CC4 Pro、CC4和CC4L三款产品的技术规格进行全面核对和更新。

---

## 参数对照分析

根据规格图，以下是三款产品的主要参数（需要核对/新增/修正的项目）：

### CC4 Pro 核心规格
| 参数类别 | 规格值 |
|---------|-------|
| CPU | QCM6490, 8-Core 2.7G, 6nm |
| Frame | 2K/4K/6915 |
| RAM | 8+128GB / 12+256GB |
| GPU | Adreno 643, ~900 GFLOPS |
| NPU | 12 TOPS |
| OS | TEYES OS (Android 13) |
| Memory | LPDDR5 + UFS3.1 |
| Display | 2000×1200, 2K(AMOLED) |
| Touch Haptic | Supported |
| Audio | 7.1 Channel, TAS6424 Digital Amp |
| DTS | ✓ |
| Camera | Up to 6 (4 digital + 2 analog), 360° Built-in |
| WIFI | WIFI 6/6E 2.4G+5GHz |
| Bluetooth | 5.2/5.3/5.4 |
| Navigation | Dual Band L1+L5, 1-2m accuracy |
| Video | 4K@60fps playback, DP 4K@60fps output |

### CC4 核心规格
| 参数类别 | 规格值 |
|---------|-------|
| CPU | SM6375 (8-Core) |
| RAM | 4+64GB / 6+128GB |
| GPU | Adreno 619, 1.2GHz |
| NPU | N/A |
| OS | TEYES OS (Android 12) |
| Memory | LPDDR4X + eMMC5.1 |
| Display | 1280×800, IPS |
| Touch Haptic | Supported |
| Audio | 4.1 Channel, TDA7851 Analog |
| DTS | ✓ |
| Camera | Supports AHD 720P/1080P, Dual 360° optional |
| WIFI | WIFI 5 2.4G+5GHz |
| Bluetooth | EU/US/TW: 5.2/4.2/5.1 |
| Navigation | Single L1, 5-10m accuracy |
| Video | 1080@30fps playback |

### CC4L 核心规格
| 参数类别 | 规格值 |
|---------|-------|
| CPU | SA8307 (4-Core) |
| RAM | 4GB+64GB |
| GPU | Adreno 610 |
| NPU | N/A |
| OS | TEYES OS (Android 10) |
| Memory | LPDDR4 + eMMC5.1 |
| Display | 1024×600, IPS |
| Touch Haptic | N/A |
| Audio | Analog output |
| DTS | N/A |
| Camera | Supports AHD/CVBS, No 360° |
| WIFI | WIFI 2.4G+5GHz |
| Bluetooth | BT2/4.2/5.1 |
| Navigation | Single band, 10-20m accuracy |
| Video | 1920×1080@60fps playback |
| CarPlay/Android Auto | Wired only |

---

## 实施步骤

### 1. 更新 products.ts 中的规格数据

**文件**: `src/data/products.ts`

为三款产品更新/新增以下规格类别：

- **CPU相关**: CPU型号、Frame、GPU、NPU、Memory Type
- **显示相关**: Screen Resolution、Display Type、Touch Haptic
- **音频相关**: Amplifier、Audio Channel、Subwoofer Output、Sound Effect (DTS)、Digital Output
- **摄像头**: Camera Signal、Camera Channels、360° SVM、Sentry Mode
- **导航**: Navigation、Accuracy
- **连接**: WIFI、Bluetooth、4G (如适用)
- **视频**: Video Output、Video Playback
- **其他**: CarPlay、Android Auto、USB、Radio等

### 2. 更新产品 features 标签

根据实际规格更新每款产品的快速特性标签，确保准确反映产品能力。

### 3. 更新产品 highlights 亮点

调整产品亮点描述以匹配实际规格。

---

## 技术细节

需要更新的数据结构（示例 - CC4 Pro）：

```typescript
{
  id: "cc4-pro",
  specs: [
    { label: "CPU", value: "QCM6490 8-Core 2.7G 6nm" },
    { label: "Frame", value: "2K/4K/6915" },
    { label: "GPU", value: "Adreno 643 ~900 GFLOPS" },
    { label: "NPU", value: "12 TOPS" },
    { label: "RAM + ROM", value: "8+128GB / 12+256GB" },
    { label: "Memory Type", value: "LPDDR5 + UFS3.1" },
    { label: "Screen Resolution", value: "2000×1200" },
    { label: "Display Type", value: "2K AMOLED" },
    { label: "Touch Haptic", value: "Yes" },
    { label: "Amplifier", value: "TAS6424 Digital" },
    { label: "Audio Channel", value: "7.1 Channel" },
    { label: "Subwoofer Output", value: "4V" },
    { label: "Sound Effect", value: "DTS®" },
    { label: "Digital Output", value: "Optical + Coaxial (24bit/192kHz)" },
    { label: "Camera Signal", value: "LVDS/AHD/CVBS Digital & Analog" },
    { label: "Camera Channels", value: "Up to 6 (4 digital + 2 analog)" },
    { label: "360° SVM", value: "Built-in" },
    { label: "Sentry Mode", value: "Yes" },
    { label: "Navigation", value: "Dual Band L1+L5, 50-80 Satellites" },
    { label: "Accuracy", value: "1-2 meters" },
    { label: "OS", value: "TEYES OS (Android 13)" },
    { label: "WIFI", value: "WIFI 6/6E 2.4G+5GHz" },
    { label: "Bluetooth", value: "5.2/5.3/5.4" },
    { label: "4G", value: "EU/US/TW/BRA" },
    { label: "Video Output", value: "DP 4K@60fps" },
    { label: "Video Playback", value: "4K@60fps" },
    { label: "Apple CarPlay", value: "Yes (Wireless)" },
    { label: "Android Auto", value: "Yes (Wireless)" },
    // ... 更多参数
  ]
}
```

---

## 需要同步更新的页面

1. **ProductCompare.tsx**: 需要扩展 `compareSpecs` 数组以包含更多对比项目
2. **ProductDetail.tsx**: 已使用动态数据，无需修改
3. **ProductLines.tsx**: 产品卡片使用 features 数组，会自动更新

---

## 预计影响

- 产品详情页将显示完整准确的规格
- 产品对比页可展示更丰富的对比维度
- SEO描述将基于准确的产品特性生成
