#CURRENTLY IN VERY BROKEN STATE


# ════════════════════════════════════════════════════════════════════════════
#  RGSS Williams Portal — Installer Launcher (Windows)
#
#  Downloads install.sh and runs it under Git Bash, installing Git for
#  Windows first if it isn't already present.
#
#  Usage:
#    Right-click -> "Run with PowerShell"
#    (or: powershell -ExecutionPolicy Bypass -File install.ps1)
# ════════════════════════════════════════════════════════════════════════════

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================="
Write-Host " RGSS Williams Portal Installer Launcher"
Write-Host "========================================="
Write-Host ""

# ── Self-elevate ───────────────────────────────────────────────────────────
# Installing Git for Windows and writing to %ProgramData% both require
# Administrator rights. Relaunching elevated here (single UAC prompt) means
# Git Bash and install.sh, started below, inherit that elevated token —
# install.sh's own admin check ('net session') will then already pass and
# won't trigger a second UAC prompt.
# Source: https://learn.microsoft.com/dotnet/api/system.security.principal.windowsprincipal.isinrole
#         https://learn.microsoft.com/powershell/module/microsoft.powershell.management/start-process
$currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
$isAdmin = (New-Object Security.Principal.WindowsPrincipal($currentUser)).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "Elevation required - requesting Administrator privileges..."

    if (-not $PSCommandPath) {
        throw "Could not determine the script's path for elevation. Re-run this script from an elevated PowerShell prompt."
    }

    $proc = Start-Process -FilePath "powershell.exe" `
        -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-File", "`"$PSCommandPath`"") `
        -Verb RunAs -Wait -PassThru

    exit $proc.ExitCode
}

# Force TLS 1.2 for the download below. Older Windows / .NET defaults to
# TLS 1.0, which GitHub's servers reject, causing Invoke-WebRequest to fail
# with an "underlying connection was closed" error.
# Source: https://learn.microsoft.com/troubleshoot/azure/active-directory/enable-support-tls-environment#configure-the-environment-to-support-tls-12
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# ── Install Git (includes Git Bash) ──────────────────────────────────────────

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Git for Windows..."

    if (Get-Command winget -ErrorAction SilentlyContinue) {
        winget install --id Git.Git --exact `
            --accept-source-agreements `
            --accept-package-agreements
    }
    else {
        throw "winget not found. Install Git manually from https://git-scm.com/download/win"
    }
}

# ── Locate Git Bash ───────────────────────────────────────────────────────────
# Checked directly by path (rather than relying on PATH), since a winget
# install in this same process won't be reflected in $env:PATH until a new
# shell is started.

$gitBash = @(
    "$env:ProgramFiles\Git\bin\bash.exe",
    "$env:ProgramFiles\Git\usr\bin\bash.exe",
    "${env:ProgramFiles(x86)}\Git\bin\bash.exe",
    "${env:ProgramFiles(x86)}\Git\usr\bin\bash.exe",
    "$env:LocalAppData\Programs\Git\bin\bash.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $gitBash) {
    throw "Git Bash not found after installation. Restart PowerShell and try again, or install Git manually from https://git-scm.com/download/win"
}

Write-Host "Using Git Bash: $gitBash"

# ── Download install.sh ──────────────────────────────────────────────────────

$installDir = Join-Path $env:ProgramData "RGSSInstaller"
New-Item -ItemType Directory -Force -Path $installDir | Out-Null

$scriptPath = Join-Path $installDir "install.sh"
$scriptUrl  = "https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-frontend/refs/heads/main/install.sh"

Write-Host "Downloading install.sh..."

# -UseBasicParsing avoids Invoke-WebRequest's dependency on Internet
# Explorer's first-run configuration, which is otherwise required on a
# fresh Windows install and would throw "first-time use" errors here.
# Source: https://learn.microsoft.com/powershell/module/microsoft.powershell.utility/invoke-webrequest
Invoke-WebRequest -Uri $scriptUrl -OutFile $scriptPath -UseBasicParsing

if (-not (Test-Path $scriptPath) -or (Get-Item $scriptPath).Length -eq 0) {
    throw "Download failed or produced an empty file: $scriptPath"
}

Write-Host "Saved to: $scriptPath"

# ── Run install.sh under Git Bash ────────────────────────────────────────────

Write-Host "Launching installer with Git Bash..."
Write-Host ""

# No -Verb RunAs here: this PowerShell process is already elevated (see
# self-elevation above), so Git Bash — and install.sh's own logic — inherit
# that elevation without a second UAC prompt.
& $gitBash $scriptPath
$exitCode = $LASTEXITCODE

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "Installer finished successfully."
} else {
    Write-Host "Installer exited with code $exitCode."
}

exit $exitCode
