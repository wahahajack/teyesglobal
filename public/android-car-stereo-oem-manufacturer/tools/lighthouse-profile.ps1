function lh-run {
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

    & 'D:\Users\ZhuanZ\.codex\bin\invoke-stable-lighthouse.ps1' @PSBoundParameters
}

function lh-run-mobile {
    param(
        [string]$Url,
        [string]$ServeRoot = (Get-Location).Path,
        [string]$Pathname = '/',
        [int]$Port = 4173,
        [int]$ChromeDebugPort = 0,
        [string]$OutputFile = 'lighthouse-mobile.json',
        [switch]$NoServer
    )

    lh-run @PSBoundParameters -Mode mobile
}

function lh-run-desktop {
    param(
        [string]$Url,
        [string]$ServeRoot = (Get-Location).Path,
        [string]$Pathname = '/',
        [int]$Port = 4173,
        [int]$ChromeDebugPort = 0,
        [string]$OutputFile = 'lighthouse-desktop.json',
        [switch]$NoServer
    )

    lh-run @PSBoundParameters -Mode desktop
}

function lh-run-live {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Url,
        [ValidateSet('mobile', 'desktop')]
        [string]$Mode = 'mobile',
        [string]$OutputFile
    )

    if (-not $OutputFile) {
        $OutputFile = if ($Mode -eq 'desktop') { 'lighthouse-live-desktop.json' } else { 'lighthouse-live-mobile.json' }
    }

    lh-run -Url $Url -NoServer -Mode $Mode -OutputFile $OutputFile
}
