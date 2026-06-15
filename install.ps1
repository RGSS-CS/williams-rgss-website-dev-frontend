# Requires: Run PowerShell as Administrator

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================="
Write-Host " RGSS Williams Portal Installer Launcher"
Write-Host "========================================="
Write-Host ""

# Install Git (includes Git Bash)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
Write-Host "Installing Git for Windows..."

```
if (Get-Command winget -ErrorAction SilentlyContinue) {
    winget install --id Git.Git --exact `
        --accept-source-agreements `
        --accept-package-agreements
}
else {
    throw "winget not found. Install Git manually from https://git-scm.com/download/win"
}
```

}

# Locate Git Bash

$gitBash = @(
"$env:ProgramFiles\Git\bin\bash.exe",
"$env:ProgramFiles\Git\usr\bin\bash.exe",
"${env:ProgramFiles(x86)}\Git\bin\bash.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $gitBash) {
throw "Git Bash not found after installation."
}

# Create working directory

$installDir = Join-Path $env:ProgramData "RGSSInstaller"
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

$scriptPath = Join-Path $installDir "install.sh"

Write-Host "Downloading install.sh..."

Invoke-WebRequest `    -Uri "https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-frontend/refs/heads/main/install.sh"`
-OutFile $scriptPath

Write-Host "Launching installer with Git Bash..."
Write-Host ""

Start-Process `    -FilePath $gitBash`
-ArgumentList "`"$scriptPath`"" `    -Verb RunAs`
-Wait

Write-Host ""
Write-Host "Installer finished."
