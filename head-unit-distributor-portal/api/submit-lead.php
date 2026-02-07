<?php
/**
 * TEYES Distributor Lead Submission Handler
 * Version: 2.3 (Text Updated & Standard Namecheap Config)
 * * 标题改为 New TEYES leads
 * * 正文改为 COMPANY NAME
 * * 采用“先响应后发信”机制，解决红条报错问题
 */

// ============================================
// 1. CONFIGURATION (配置区)
// ============================================

// 时区设置 - 解决日志时间不正确的问题
date_default_timezone_set('Asia/Shanghai');

// ⚠️⚠️⚠️ 这里我改回了 Namecheap 标准配置 ⚠️⚠️⚠️
// 如果这个还不行，请联系 Namecheap 客服确认您的 SMTP 服务器地址
define('SMTP_HOST', 'mail.privateemail.com');    // ✅ 改回标准服务器
define('SMTP_PORT', 465);                       // ✅ SSL 端口
define('SMTP_SECURE', 'ssl');                   // ✅ SSL 协议
define('SMTP_USERNAME', 'info@teyesauto.com');  // 账号
define('SMTP_PASSWORD', 'www.teyesauto.com');     // ⬅️⬅️⬅️ 请填入真实密码！！

define('SMTP_FROM_EMAIL', 'info@teyesauto.com');
define('SMTP_FROM_NAME', 'TEYES Lead System');
define('NOTIFY_TO_EMAIL', 'lina@teyesauto.com');

define('ALLOWED_ORIGINS', [
    'https://teyesauto.com',
    'https://www.teyesauto.com',
    'http://localhost'
]);

define('DATA_FILE', __DIR__ . '/../data/leads.json');
define('LOG_FILE', __DIR__ . '/../data/email-error.log');

// ============================================
// 2. 核心逻辑 (先保存，立即返回成功，后台再发信)
// ============================================

header('Content-Type: application/json');
error_reporting(0); // 禁止错误输出干扰前端

// 跨域处理
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 获取数据
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    outputJson(false, 'Invalid Input');
}

// 准备数据
$lead = [
    'id' => 'TEYES-' . time(),
    'company_name' => strip_tags($input['company_name'] ?? ''),
    'contact_name' => strip_tags($input['contact_name'] ?? ''),
    'country' => strip_tags($input['country'] ?? ''),
    'email' => filter_var($input['email'] ?? '', FILTER_SANITIZE_EMAIL),
    'business_model' => strip_tags($input['business_model'] ?? ''),
    'intent' => $input['intent'] ?? 'distributor',
    'date' => date('Y-m-d H:i:s')
];

// ✅ 第一步：先保存文件
$dataDir = dirname(DATA_FILE);
if (!is_dir($dataDir))
    mkdir($dataDir, 0755, true);
$leads = file_exists(DATA_FILE) ? json_decode(file_get_contents(DATA_FILE), true) : [];
$leads[] = $lead;
file_put_contents(DATA_FILE, json_encode($leads, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// ============================================
// ✅ 第二步：先发邮件（重要：必须在响应前执行，因为服务器不支持后台执行）
// ============================================

// 记录日志
file_put_contents(LOG_FILE, "\n" . date('Y-m-d H:i:s') . " === 新请求 ===\n", FILE_APPEND);
file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " Lead: {$lead['id']}, Intent: {$lead['intent']}, Email: {$lead['email']}\n", FILE_APPEND);

$emailSuccess = true;

// 检查密码配置
if (strpos(SMTP_PASSWORD, '您的真实邮箱密码') !== false) {
    file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [ERROR] 密码未配置\n", FILE_APPEND);
    $emailSuccess = false;
} else {
    // 发送管理员通知邮件
    // 根据intent显示不同的来源标签
    $intentLabel = ($lead['intent'] === 'catalog') ? '📥 下载目录' : '🤝 申请代理';
    $adminBody = "<h3>COMPANY NAME: {$lead['company_name']}</h3><p><strong>来源/Intent: {$intentLabel}</strong><br><br>Contact: {$lead['contact_name']}<br>Email: {$lead['email']}<br>Country: {$lead['country']}<br>Model: {$lead['business_model']}</p>";

    try {
        // 邮件标题也加上来源标签
        $subjectPrefix = ($lead['intent'] === 'catalog') ? '[下载目录]' : '[申请代理]';
        $result1 = sendSmtpMail(NOTIFY_TO_EMAIL, "{$subjectPrefix} New TEYES leads: {$lead['company_name']}", $adminBody);
        file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " 管理员邮件: " . ($result1 ? "成功" : "失败") . "\n", FILE_APPEND);

        // 如果是目录请求，发送给客户
        if ($lead['intent'] === 'catalog') {
            $link = "https://teyesauto.com/head-unit-distributor-portal/TEYES_2026_Wholesale_Catalog.pdf";
            $custBody = "<p>Dear {$lead['contact_name']},</p><p>Thank you for your interest in TEYES products.</p><p>Download our 2026 Catalog: <a href='$link'>Click Here</a></p><p>Best regards,<br>TEYES Team</p>";
            $result2 = sendSmtpMail($lead['email'], "TEYES 2026 Catalog", $custBody);
            file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " 客户邮件({$lead['email']}): " . ($result2 ? "成功" : "失败") . "\n", FILE_APPEND);
        }
    } catch (Exception $e) {
        file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [CRASH] " . $e->getMessage() . "\n", FILE_APPEND);
        $emailSuccess = false;
    }
}

file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " === 完成 ===\n", FILE_APPEND);

// ✅ 第三步：发送成功响应给浏览器
$redirectUrl = ($lead['intent'] === 'catalog') ? 'thank-you-catalog.html' : 'thank-you.html';
echo json_encode([
    'success' => true,
    'redirect_url' => $redirectUrl
]);
exit;

// ============================================
// 4. 发信函数
// ============================================
function sendSmtpMail($to, $subject, $body)
{
    // 设置10秒超时，防止一直卡住
    $socket = fsockopen('ssl://' . SMTP_HOST, SMTP_PORT, $errno, $errstr, 10);
    if (!$socket) {
        file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [CONNECT ERROR] $errstr\n", FILE_APPEND);
        return false;
    }

    // 记录发送开始
    file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [INFO] 开始发送邮件到: $to\n", FILE_APPEND);

    $response = serverCmd($socket, 'CONNECT');

    // EHLO 命令 - 使用邮件域名而非 SERVER_NAME（更可靠）
    $serverName = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'teyesauto.com';
    fputs($socket, "EHLO $serverName\r\n");
    $response = serverCmd($socket, 'EHLO');

    // SSL模式不需要STARTTLS，直接登录
    fputs($socket, "AUTH LOGIN\r\n");
    $response = serverCmd($socket, 'AUTH LOGIN');

    fputs($socket, base64_encode(SMTP_USERNAME) . "\r\n");
    $response = serverCmd($socket, 'USERNAME');

    fputs($socket, base64_encode(SMTP_PASSWORD) . "\r\n");
    $response = serverCmd($socket, 'PASSWORD');

    // 检查认证是否成功（响应应以 235 开头）
    if (strpos($response, '235') === false && strpos($response, '250') === false) {
        file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [AUTH ERROR] 认证失败: $response\n", FILE_APPEND);
        fclose($socket);
        return false;
    }

    fputs($socket, "MAIL FROM: <" . SMTP_FROM_EMAIL . ">\r\n");
    $response = serverCmd($socket, 'MAIL FROM');

    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = serverCmd($socket, 'RCPT TO');

    fputs($socket, "DATA\r\n");
    $response = serverCmd($socket, 'DATA');

    // 构建邮件头 - 增强版，提高Gmail送达率
    $messageId = '<' . uniqid('teyes_', true) . '@teyesauto.com>'; // 唯一Message-ID

    $message = "MIME-Version: 1.0\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Date: " . date("r") . "\r\n";
    $message .= "Message-ID: $messageId\r\n"; // Gmail需要这个
    $message .= "From: TEYES <" . SMTP_FROM_EMAIL . ">\r\n"; // 使用更正式的名称
    $message .= "Reply-To: " . SMTP_FROM_EMAIL . "\r\n"; // 回复地址
    $message .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $message .= "To: $to\r\n";
    $message .= "X-Mailer: TEYES Lead System\r\n"; // 标识发送系统
    $message .= "\r\n"; // 空行分隔 headers 和 body（关键！）
    $message .= $body;
    $message .= "\r\n.\r\n"; // 结束标记

    fputs($socket, $message);
    $response = serverCmd($socket, 'DATA CONTENT');

    // 检查发送是否成功（响应应以 250 开头）
    if (strpos($response, '250') === false) {
        file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [SEND ERROR] 发送失败: $response\n", FILE_APPEND);
        fputs($socket, "QUIT\r\n");
        fclose($socket);
        return false;
    }

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [SUCCESS] 邮件发送成功到: $to\n", FILE_APPEND);
    return true;
}

function serverCmd($socket, $step = '')
{
    $response = '';
    stream_set_timeout($socket, 10); // 设置读取超时
    while ($str = fgets($socket, 515)) {
        $response .= $str;
        if (substr($str, 3, 1) == " ")
            break;
    }

    // 记录每一步的响应，方便调试
    if (!empty($step)) {
        file_put_contents(LOG_FILE, date('Y-m-d H:i:s') . " [$step] $response", FILE_APPEND);
    }

    return $response;
}

function outputJson($success, $msg = '')
{
    echo json_encode(['success' => $success, 'error' => $msg]);
    exit;
}
?>