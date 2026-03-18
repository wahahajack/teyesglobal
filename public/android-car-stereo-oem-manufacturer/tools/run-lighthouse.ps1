& "$PSScriptRoot\invoke-stable-lighthouse.ps1" `
    -ServeRoot (Split-Path -Parent (Split-Path -Parent $PSScriptRoot)) `
    -Pathname '/android-car-stereo-oem-manufacturer/' `
    @args
