param(
    [Parameter(Mandatory = $true)]
    [string]$Url,
    [string]$ProjectRoot = (Get-Location).Path,
    [string]$OutputDir,
    [string]$OutputName = 'lighthouse',
    [ValidateSet('mobile', 'desktop', 'both')]
    [string]$Mode = 'both',
    [string]$StartCommand,
    [string]$ReadyUrl,
    [int]$ReadyTimeoutSec = 90,
    [int]$ChromeDebugPort = 0,
    [switch]$SkipServer
)

$ErrorActionPreference = 'Stop'

function Get-ChromePath {
    $candidates = @(
        'C:\Program Files\Google\Chrome\Application\chrome.exe',
        'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
        'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
        'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    )

    foreach ($candidate in $candidates) {
        if (Test-Path $candidate) {
            return $candidate
        }
    }

    throw 'Chrome or Edge was not found in the default install paths.'
}

function Wait-ForHttp {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TargetUrl,
        [int]$TimeoutSec = 90
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $deadline) {
        try {
            $response = Invoke-WebRequest -Uri $TargetUrl -UseBasicParsing -TimeoutSec 3
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                return
            }
        } catch {
            Start-Sleep -Milliseconds 750
        }
    }

    throw "Timed out waiting for $TargetUrl"
}

function Get-ModeList {
    param([string]$SelectedMode)

    if ($SelectedMode -eq 'both') {
        return @('mobile', 'desktop')
    }

    return @($SelectedMode)
}

function Get-ScoreSummary {
    param([string]$JsonPath)

    if (-not (Test-Path $JsonPath)) {
        Write-Warning "JSON report not found at $JsonPath"
        return $null
    }

    try {
        $jsonContent = Get-Content $JsonPath -Raw -Encoding utf8
        if ([string]::IsNullOrWhiteSpace($jsonContent)) {
            Write-Warning "JSON report at $JsonPath is empty"
            return $null
        }
        $report = $jsonContent | ConvertFrom-Json
        return [PSCustomObject]@{
            performance   = [math]::Round(($report.categories.performance.score * 100), 0)
            accessibility = [math]::Round(($report.categories.accessibility.score * 100), 0)
            bestPractices = [math]::Round(($report.categories.'best-practices'.score * 100), 0)
            seo           = [math]::Round(($report.categories.seo.score * 100), 0)
            fcp           = $report.audits.'first-contentful-paint'.displayValue
            lcp           = $report.audits.'largest-contentful-paint'.displayValue
            tbt           = $report.audits.'total-blocking-time'.displayValue
            cls           = $report.audits.'cumulative-layout-shift'.displayValue
            speedIndex    = $report.audits.'speed-index'.displayValue
        }
    } catch {
        Write-Warning ("Failed to parse JSON report at " + $JsonPath + ": " + $_.Exception.Message)
        return $null
    }
}

$toolRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$toolNodeModules = Join-Path $toolRoot 'node_modules'
$toolBin = Join-Path $toolNodeModules '.bin\lighthouse.cmd'
$chromePath = Get-ChromePath
$resolvedProjectRoot = (Resolve-Path $ProjectRoot).Path

if (-not (Test-Path $toolBin)) {
    throw "Lighthouse is not installed. Run 'npm install' in $toolRoot first."
}

if (-not $OutputDir) {
    $OutputDir = Join-Path $resolvedProjectRoot 'lighthouse-reports'
}

$resolvedOutputDir = [System.IO.Path]::GetFullPath($OutputDir)
$tempRoot = Join-Path $resolvedOutputDir '.tmp'
$resolvedChromeDebugPort = if ($ChromeDebugPort -gt 0) { $ChromeDebugPort } else { Get-Random -Minimum 9300 -Maximum 9800 }
$chromeProfileDir = Join-Path $tempRoot "chrome-profile-$resolvedChromeDebugPort"
$readyTarget = if ($ReadyUrl) { $ReadyUrl } else { $Url }

New-Item -ItemType Directory -Force -Path $resolvedOutputDir | Out-Null
New-Item -ItemType Directory -Force -Path $tempRoot | Out-Null

if (Test-Path $chromeProfileDir) {
    Remove-Item -LiteralPath $chromeProfileDir -Recurse -Force -ErrorAction SilentlyContinue
}

New-Item -ItemType Directory -Force -Path $chromeProfileDir | Out-Null

$server = $null
$chrome = $null
$results = @()

try {
    if (-not $SkipServer -and -not [string]::IsNullOrWhiteSpace($StartCommand)) {
        $server = Start-Process `
            -FilePath 'powershell.exe' `
            -ArgumentList @('-NoProfile', '-Command', $StartCommand) `
            -WorkingDirectory $resolvedProjectRoot `
            -PassThru `
            -WindowStyle Hidden

        Wait-ForHttp -TargetUrl $readyTarget -TimeoutSec $ReadyTimeoutSec
    } elseif (-not $SkipServer -and [string]::IsNullOrWhiteSpace($StartCommand)) {
        Wait-ForHttp -TargetUrl $readyTarget -TimeoutSec $ReadyTimeoutSec
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
    Wait-ForHttp -TargetUrl "http://127.0.0.1:$resolvedChromeDebugPort/json/version" -TimeoutSec 20

    $env:TEMP = $tempRoot
    $env:TMP = $tempRoot

    foreach ($currentMode in Get-ModeList -SelectedMode $Mode) {
        # Lighthouse adds .report.json and .report.html when multiple outputs are used
        $baseOutputPath = Join-Path $resolvedOutputDir "$OutputName-$currentMode"
        $jsonPath = "$baseOutputPath.report.json"
        $htmlPath = "$baseOutputPath.report.html"

        $lighthouseArgs = @(
            $Url,
            "--port=$resolvedChromeDebugPort",
            '--only-categories=performance,accessibility,best-practices,seo',
            '--throttling-method=simulate',
            '--output=json',
            '--output=html',
            "--output-path=$baseOutputPath",
            '--quiet'
        )

        if ($currentMode -eq 'desktop') {
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

        & $toolBin @lighthouseArgs

        if ($LASTEXITCODE -ne 0) {
            throw "Lighthouse exited with code $LASTEXITCODE for mode '$currentMode'."
        }

        $summary = Get-ScoreSummary -JsonPath $jsonPath
        if ($summary) {
            $results += [PSCustomObject]@{
                mode          = $currentMode
                jsonPath      = $jsonPath
                htmlPath      = $htmlPath
                performance   = $summary.performance
                accessibility = $summary.accessibility
                bestPractices = $summary.bestPractices
                seo           = $summary.seo
                fcp           = $summary.fcp
                lcp           = $summary.lcp
                tbt           = $summary.tbt
                cls           = $summary.cls
                speedIndex    = $summary.speedIndex
            }
        } else {
            Write-Warning "Could not generate summary for $currentMode"
        }
    }

    $summaryPath = Join-Path $resolvedOutputDir "$OutputName-summary.json"
    $results | ConvertTo-Json -Depth 4 | Set-Content -Path $summaryPath -Encoding utf8

    $results | Format-Table -AutoSize | Out-String | Write-Output
    Write-Output "Summary saved to $summaryPath"
} finally {
    if ($chrome) {
        Stop-Process -Id $chrome.Id -Force -ErrorAction SilentlyContinue
    }

    if ($server) {
        Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
    }
}
