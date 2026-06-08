#!/bin/bash

echo "Starting Script"

# ── Privilege Escalation ──────────────────────────────────────────────────────

request_admin() {
    if [[ "$OSTYPE" == linux* || "$OSTYPE" == darwin* ]]; then
        if [[ "$EUID" -ne 0 ]]; then
            echo "==> Elevated privileges required. Re-launching with sudo..."
            exec sudo -E bash "$0" "$@"
        else
            echo "==> Running as root. Privilege check passed."
        fi

    elif [[ "$OSTYPE" == msys* || "$OSTYPE" == cygwin* ]]; then
        if ! net session > /dev/null 2>&1; then
            echo "==> Not running as Administrator."
            echo "    Triggering UAC prompt to re-launch with elevated privileges..."
            powershell -Command "Start-Process bash -ArgumentList '$0' -Verb RunAs -Wait"
            exit 0
        else
            echo "==> Running as Administrator. Privilege check passed."
        fi
    fi
}

request_admin "$@"

# ── OS Detection ──────────────────────────────────────────────────────────────

get_os() {
    if [[ "$OSTYPE" == linux* ]]; then
        echo "OS is Linux, please confirm using y/n"
        read -rp "y/n: " confirmation
        [[ "$confirmation" == "y" || "$confirmation" == "Y" ]] && ostype="linux" || ostype="undefined"

    elif [[ "$OSTYPE" == msys* || "$OSTYPE" == cygwin* ]]; then
        echo "OS is Windows, please confirm using y/n"
        read -rp "y/n: " confirmation
        [[ "$confirmation" == "y" || "$confirmation" == "Y" ]] && ostype="windows" || ostype="undefined"

    elif [[ "$OSTYPE" == darwin* ]]; then
        echo "OS is macOS, please confirm using y/n"
        read -rp "y/n: " confirmation
        [[ "$confirmation" == "y" || "$confirmation" == "Y" ]] && ostype="osx" || ostype="undefined"

    else
        echo "OS TYPE not supported. Please use Windows, Linux, or macOS."
        ostype="undefined"
    fi
}

# ── Docker Installers ─────────────────────────────────────────────────────────

install_docker_linux() {
    echo ""
    echo "==> Installing Docker Engine (CLI) for Linux..."

    if command -v apt-get &>/dev/null; then
        echo "  -> Detected apt (Debian/Ubuntu)"
        apt-get update -y
        apt-get install -y ca-certificates curl gnupg lsb-release

        install -m 0755 -d /etc/apt/keyrings
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
            | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        chmod a+r /etc/apt/keyrings/docker.gpg

        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
          https://download.docker.com/linux/ubuntu \
          $(lsb_release -cs) stable" \
          | tee /etc/apt/sources.list.d/docker.list > /dev/null

        apt-get update -y
        apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    elif command -v dnf &>/dev/null; then
        echo "  -> Detected dnf (Fedora/RHEL)"
        dnf -y install dnf-plugins-core
        dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
        dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    elif command -v yum &>/dev/null; then
        echo "  -> Detected yum (CentOS/older RHEL)"
        yum install -y yum-utils
        yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    elif command -v pacman &>/dev/null; then
        echo "  -> Detected pacman (Arch Linux)"
        pacman -Sy --noconfirm docker

    else
        echo "  [!] No supported package manager found."
        echo "      Install Docker manually: https://docs.docker.com/engine/install/"
        return 1
    fi

    systemctl enable --now docker
    usermod -aG docker "$SUDO_USER"

    echo ""
    echo "  [OK] Docker Engine installed."
    echo "  [!]  Log out and back in (or run 'newgrp docker') for group membership to take effect."
}

install_docker_mac() {
    echo ""
    echo "==> Installing Docker Desktop for macOS..."

    if ! command -v brew &>/dev/null; then
        echo "  -> Homebrew not found. Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        [[ -f /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
    else
        echo "  -> Homebrew already installed: $(brew --version | head -1)"
    fi

    brew install --cask docker
    echo ""
    echo "  [OK] Docker Desktop installed. Launch /Applications/Docker.app to complete setup."
}

install_docker_windows() {
    echo ""
    echo "==> Installing Docker Desktop for Windows..."

    if command -v winget &>/dev/null; then
        winget install --id Docker.DockerDesktop --exact --accept-source-agreements --accept-package-agreements
    elif command -v choco &>/dev/null; then
        choco install docker-desktop -y
    else
        echo "  [!] Neither winget nor Chocolatey found."
        echo "      Download manually: https://www.docker.com/products/docker-desktop/"
        return 1
    fi

    echo ""
    echo "  [OK] Docker Desktop installation triggered."
    echo "  [!]  A restart may be required to complete WSL2/Hyper-V setup."
}

# ── Utilities ─────────────────────────────────────────────────────────────────

# Generates a cryptographically random hex string.
# Uses openssl first (available on all platforms), falls back to python3 or /dev/urandom.
# Source: https://www.openssl.org/docs/man3.0/man1/openssl-rand.html
generate_secret() {
    local bytes="${1:-32}"  # 32 bytes = 64 hex chars — well above Django's recommended 50-char key
    if command -v openssl &>/dev/null; then
        openssl rand -hex "$bytes"
    elif command -v python3 &>/dev/null; then
        python3 -c "import secrets; print(secrets.token_hex($bytes))"
    else
        # Last resort: read raw bytes from the kernel CSPRNG
        # /dev/urandom is non-blocking and cryptographically safe on Linux ≥ 4.8 and macOS
        # Source: https://man7.org/linux/man-pages/man4/urandom.4.html
        cat /dev/urandom | tr -dc 'a-f0-9' | head -c "$((bytes * 2))"
    fi
}

# Downloads a file with curl (preferred) or wget.
# curl and wget both support HTTPS and follow redirects by default.
download_file() {
    local url="$1"
    local dest="$2"
    if command -v curl &>/dev/null; then
        curl -fsSL "$url" -o "$dest"
    elif command -v wget &>/dev/null; then
        wget -q "$url" -O "$dest"
    else
        echo "  [!] Neither curl nor wget found. Cannot download files."
        return 1
    fi
}

# Prompts the user for a value; writes result to global $PROMPT_RESULT.
# Using a global avoids subshell issues where `read` inside $() can't always
# access /dev/tty on all platforms.
PROMPT_RESULT=""
prompt_var() {
    local label="$1"
    local default="$2"
    local secret="${3:-false}"

    if [[ "$secret" == "true" ]]; then
        # -s hides typed input (no echo) — standard for passwords
        read -rsp "  $label (hidden): " PROMPT_RESULT
        echo ""   # Print newline since -s suppresses it
    elif [[ -n "$default" ]]; then
        read -rp "  $label [$default]: " PROMPT_RESULT
        PROMPT_RESULT="${PROMPT_RESULT:-$default}"
    else
        read -rp "  $label: " PROMPT_RESULT
    fi
}

install_portainer() {
    echo ""
    echo "==> Installing Portainer..."

    # Create persistent volume if it doesn't already exist
    docker volume inspect portainer_data >/dev/null 2>&1 || \
        docker volume create portainer_data

    # Remove existing Portainer container if present
    if docker ps -a --format '{{.Names}}' | grep -q '^portainer$'; then
        echo "  -> Existing Portainer installation detected."
        docker rm -f portainer >/dev/null 2>&1
    fi

    docker run -d \
        --name portainer \
        --restart=unless-stopped \
        -p 9000:9000 \
        -p 9443:9443 \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v portainer_data:/data \
        portainer/portainer-ce:latest

    echo ""
    echo "  [OK] Portainer installed."
    echo "  [OK] Web UI: https://localhost:9443"
}

# ── Project Setup ─────────────────────────────────────────────────────────────

FRONTEND_RAW="https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-frontend/main/compose.yml"
BACKEND_RAW="https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-backend/main/compose.yml"

setup_backend() {
    echo ""
    echo "==> Setting up backend..."
    mkdir -p backend

    echo "  -> Downloading backend/compose.yml..."
    download_file "$BACKEND_RAW" "backend/compose.yml" || return 1
    echo "  [OK] backend/compose.yml downloaded."

    echo ""
    echo "  Generating secrets..."
    # Django SECRET_KEY: must be long, random, and unpredictable.
    # Django itself uses 50 chars; 64 hex chars (32 bytes) exceeds that.
    # Source: https://docs.djangoproject.com/en/5.0/ref/settings/#secret-key
    local secret_key
    secret_key=$(generate_secret 32)

    # Postgres password: 48 hex chars is well beyond any brute-force concern.
    local postgres_password
    postgres_password=$(generate_secret 24)

    echo "  [AUTO] SECRET_KEY       → ${secret_key:0:12}... (truncated for display)"
    echo "  [AUTO] POSTGRES_PASSWORD → ${postgres_password:0:8}... (truncated for display)"
    echo ""
    echo "  Please provide the remaining values (press Enter to accept [defaults]):"
    echo ""

    prompt_var "ALLOWED_HOSTS (comma-separated, e.g. localhost,api.rgsscs.org)" "localhost"
    local allowed_hosts="$PROMPT_RESULT"

    prompt_var "CSRF_TRUSTED_ORIGINS (comma-separated, e.g. https://api.rgsscs.org)" "http://localhost"
    local csrf_origins="$PROMPT_RESULT"

    prompt_var "DJANGO_SUPERUSER_USERNAME" "admin"
    local superuser_username="$PROMPT_RESULT"

    prompt_var "DJANGO_SUPERUSER_EMAIL" ""
    local superuser_email="$PROMPT_RESULT"

    prompt_var "DJANGO_SUPERUSER_PASSWORD" "" "true"
    local superuser_password="$PROMPT_RESULT"

    prompt_var "POSTGRES_DB" "rgssdb"
    local postgres_db="$PROMPT_RESULT"

    prompt_var "POSTGRES_USER" "rgssuser"
    local postgres_user="$PROMPT_RESULT"

    # Write the .env file. Heredoc with quoted delimiter ('EOF') prevents
    # variable expansion inside the content — we want literal values, not re-expansion.
    cat > "backend/.env" << EOF
# ── Django ─────────────────────────────────────────────────────────────────
# AUTO-GENERATED — do not commit this file
SECRET_KEY=${secret_key}
ALLOWED_HOSTS=${allowed_hosts}
CSRF_TRUSTED_ORIGINS=${csrf_origins}
DJANGO_SUPERUSER_USERNAME=${superuser_username}
DJANGO_SUPERUSER_EMAIL=${superuser_email}
DJANGO_SUPERUSER_PASSWORD=${superuser_password}

# ── PostgreSQL ─────────────────────────────────────────────────────────────
# AUTO-GENERATED — do not commit this file
POSTGRES_DB=${postgres_db}
POSTGRES_USER=${postgres_user}
POSTGRES_PASSWORD=${postgres_password}
DB_HOST=db
DB_PORT=5432
EOF

    echo ""
    echo "  [OK] backend/.env written."
}

setup_frontend() {
    echo ""
    echo "==> Setting up frontend..."
    mkdir -p frontend

    echo "  -> Downloading frontend/compose.yml..."
    download_file "$FRONTEND_RAW" "frontend/compose.yml" || return 1
    echo "  [OK] frontend/compose.yml downloaded."

    echo ""
    echo "  Generating secrets..."
    # ADMIN_KEY is used for protected API routes — treat it like a password.
    local admin_key
    admin_key=$(generate_secret 24)
    echo "  [AUTO] ADMIN_KEY → ${admin_key:0:8}... (truncated for display)"
    echo ""
    echo "  Please provide the remaining values:"
    echo ""

    # NEXT_PUBLIC_API_URL is the public-facing URL visible in the browser.
    # NOTE: In Next.js, NEXT_PUBLIC_* vars are baked into the bundle at BUILD time,
    # not at runtime. Since this image is pre-built, this value is informational
    # for the server-side API_URL only unless you rebuild the image.
    # Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
    prompt_var "NEXT_PUBLIC_API_URL (public-facing API URL, e.g. https://api.rgsscs.org)" "https://api.rgsscs.org"
    local next_public_api_url="$PROMPT_RESULT"

    cat > "frontend/.env" << EOF
# ── Frontend ───────────────────────────────────────────────────────────────
# AUTO-GENERATED — do not commit this file

# Internal Docker-network URL used by Next.js server-side fetches
API_URL=http://backend:8000

# Public URL baked into the browser bundle at build time (NEXT_PUBLIC_* vars)
# NOTE: This only applies if you rebuild the Docker image locally.
# The pre-built GHCR image has this value fixed at the time it was built.
NEXT_PUBLIC_API_URL=${next_public_api_url}

# ── Captcha / Admin ────────────────────────────────────────────────────────
# AUTO-GENERATED — do not commit this file
ADMIN_KEY=${admin_key}
REDIS_URL=redis://valkey:6379
EOF

    echo ""
    echo "  [OK] frontend/.env written."
}

# Creates the shared Docker bridge network that both compose stacks attach to.
# Both compose files declare internetwork as external: true, so it must exist
# before running docker compose up.
# Source: https://docs.docker.com/compose/networking/#use-a-pre-existing-network
create_shared_network() {
    echo ""
    echo "==> Ensuring shared Docker network 'internetwork' exists..."
    if docker network ls --format '{{.Name}}' 2>/dev/null | grep -q '^internetwork$'; then
        echo "  -> 'internetwork' already exists. Skipping."
    else
        docker network create internetwork
        echo "  [OK] 'internetwork' network created."
    fi
}

# ── Main ──────────────────────────────────────────────────────────────────────

get_os
echo ""
echo "Detected OS: $ostype"

case "$ostype" in
    linux)   install_docker_linux ;;
    osx)     install_docker_mac ;;
    windows) install_docker_windows ;;
    *)
        echo "[!] OS undefined or unsupported — exiting."
        exit 1 ;;
esac

install_portainer

# ── Project Setup Prompt ──────────────────────────────────────────────────────

echo ""
read -rp "==> Set up the RGSS Williams portal project? [Y/n]: " setup_confirm
if [[ "$setup_confirm" == "n" || "$setup_confirm" == "N" ]]; then
    echo "Skipping project setup."
    exit 0
fi

prompt_var "Project directory" "./williams-portal"
project_dir="$PROMPT_RESULT"

mkdir -p "$project_dir"
cd "$project_dir" || { echo "[!] Could not enter $project_dir"; exit 1; }

setup_backend
setup_frontend
create_shared_network

echo ""
echo "================================================================"
echo "  Setup complete! Files created:"
echo "    $(pwd)/backend/compose.yml"
echo "    $(pwd)/backend/.env         ← keep this secret, never commit"
echo "    $(pwd)/frontend/compose.yml"
echo "    $(pwd)/frontend/.env        ← keep this secret, never commit"
echo "================================================================"
echo ""

read -rp "==> Start services now with docker compose? [Y/n]: " start_confirm
if [[ "$start_confirm" == "n" || "$start_confirm" == "N" ]]; then
    echo ""
    echo "  To start manually later:"
    echo "    cd $(pwd)/backend  && docker compose up -d"
    echo "    cd $(pwd)/frontend && docker compose up -d"
    exit 0
fi

echo ""
echo "  -> Starting backend (PostgreSQL + Django)..."
docker compose -f backend/compose.yml up -d

echo ""
echo "  -> Starting frontend (Next.js)..."
docker compose -f frontend/compose.yml up -d

echo ""
echo "================================================================"
echo "  Services started:"
echo "    Frontend → http://localhost:3000"
echo "    Backend  → http://localhost:8000"
echo "================================================================"