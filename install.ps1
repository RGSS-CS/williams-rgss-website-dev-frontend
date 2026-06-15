```powershell
# Run as Administrator

$ErrorActionPreference = "Stop"

# Install Git if needed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    winget install --id Git.Git --exact `
        --accept-source-agreements `
        --accept-package-agreements
}

# Find Git Bash
$bash = @(
    "$env:ProgramFiles\Git\bin\bash.exe",
    "$env:ProgramFiles\Git\usr\bin\bash.exe",
    "${env:ProgramFiles(x86)}\Git\bin\bash.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $bash) {
    throw "Git Bash not found."
}

# Download installer
$scriptDir = "$env:ProgramData\RGSSInstaller"
New-Item -ItemType Directory -Force -Path $scriptDir | Out-Null

$scriptFile = Join-Path $scriptDir "install.sh"
$logFile = Join-Path $scriptDir "install.log"

Invoke-WebRequest `
    -Uri "https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-frontend/refs/heads/main/install.sh" `
    -OutFile $scriptFile

Write-Host "Running installer..."
Write-Host "Log: $logFile"
Write-Host ""

# Run bash and capture output
& $bash -x $scriptFile *>&1 | Tee-Object -FilePath $logFile

Write-Host ""
Write-Host "Installer exited with code $LASTEXITCODE"
Write-Host "Log saved to: $logFile"
Write-Host ""

Read-Host "Press Enter to close"
```
