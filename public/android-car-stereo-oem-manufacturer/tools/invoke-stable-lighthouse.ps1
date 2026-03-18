param(
    [string]$Url,
    [string]$ServeRoot = (Get-Location).Path,
    [string]$Pathname = '/',
    [int]$Port = 4173,
    [int]$ChromeDebugPort = 0,
    [string]$OutputFile = 'lighthouse-mobile.json',
    [ValidateSet('mobile', 'desktop')]
    [string]$Mode = 'mobile',
    [switch]$NoServer
)

$ErrorActionPreference = 'Stop'

function Get-ChromePath {
    $candidates = @(
        'C:\Program Files\Google\Chrome\Application\chrome.exe',
        'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
        'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
        'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    )

    foreach ($path in $candidates) {
        if (Test-Path $path) {
            return $path
        }
    }

    throw 'Chrome or Edge was not found in the default install paths.'
}

function Wait-ForHttp {
    param(
        [string]$TargetUrl,
        [int]$Attempts = 20
    )

    for ($i = 0; $i -lt $Attempts; $i++) {
        try {
            $response = Invoke-WebRequest -UseBasicParsing -Uri $TargetUrl -TimeoutSec 2
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                return
            }
        } catch {
            Start-Sleep -Milliseconds 500
        }
    }

    throw "Timed out waiting for $TargetUrl"
}

$siteRoot = (Get-Location).Path
$chromePath = Get-ChromePath
$resolvedChromeDebugPort = if ($ChromeDebugPort -gt 0) { $ChromeDebugPort } else { Get-Random -Minimum 9300 -Maximum 9800 }
$tempRoot = Join-Path $siteRoot '.lh-run'
$chromeProfileDir = Join-Path $tempRoot "chrome-profile-$resolvedChromeDebugPort"
$serverOutLog = Join-Path $tempRoot 'http-server.out.log'
$serverErrLog = Join-Path $tempRoot 'http-server.err.log'
$outputPath = Join-Path $siteRoot $OutputFile

if (-not $Url) {
    $trimmedPath = if ([string]::IsNullOrWhiteSpace($Pathname)) { '/' } else { $Pathname }
    if (-not $trimmedPath.StartsWith('/')) {
        $trimmedPath = "/$trimmedPath"
    }
    $Url = "http://127.0.0.1:$Port$trimmedPath"
}

New-Item -ItemType Directory -Force -Path $tempRoot | Out-Null
if (Test-Path $chromeProfileDir) {
    Remove-Item -Path $chromeProfileDir -Recurse -Force -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Force -Path $chromeProfileDir | Out-Null

$server = $null
$chrome = $null

try {
    if (-not $NoServer) {
        $server = Start-Process -FilePath 'python' `
            -ArgumentList '-m', 'http.server', $Port, '--bind', '127.0.0.1', '--directory', $ServeRoot `
            -RedirectStandardOutput $serverOutLog `
            -RedirectStandardError $serverErrLog `
            -PassThru

        Wait-ForHttp -TargetUrl $Url
    }

    $chromeArgs = @(
        "--remote-debugging-port=$resolvedChromeDebugPort",
        "--user-data-dir=$chromeProfileDir",
        '--headless=new',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-sync',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--no-default-browser-check',
        'about:blank'
    )

    $chrome = Start-Process -FilePath $chromePath -ArgumentList $chromeArgs -PassThru
    Wait-ForHttp -TargetUrl "http://127.0.0.1:$resolvedChromeDebugPort/json/version"

    $env:TEMP = $tempRoot
    $env:TMP = $tempRoot

    $lighthouseArgs = @(
        '--yes',
        'lighthouse',
        $Url,
        "--port=$resolvedChromeDebugPort",
        '--only-categories=performance,accessibility,best-practices,seo',
        '--throttling-method=simulate',
        '--output=json',
        "--output-path=$outputPath",
        '--quiet'
    )

    if ($Mode -eq 'desktop') {
        $lighthouseArgs += @(
            '--preset=desktop',
            '--emulated-form-factor=desktop',
            '--screenEmulation.mobile=false',
            '--screenEmulation.width=1350',
            '--screenEmulation.height=940'
        )
    } else {
        $lighthouseArgs += @(
            '--emulated-form-factor=mobile',
            '--screenEmulation.mobile=true',
            '--screenEmulation.width=412',
            '--screenEmulation.height=823'
        )
    }

    & npx.cmd @lighthouseArgs

    if ($LASTEXITCODE -ne 0) {
        throw "Lighthouse exited with code $LASTEXITCODE"
    }

    Write-Output "Saved report to $outputPath"
} finally {
    if ($chrome) {
        Stop-Process -Id $chrome.Id -Force -ErrorAction SilentlyContinue
    }

    if ($server) {
        Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
    }
}
