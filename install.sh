#!/bin/bash

# ══════════════════════════════════════════════════════════════════════════════
#  RGSS Williams Portal — Installer
#  Installs Docker, Portainer, and sets up the backend + frontend project.
#
#  Usage:
#    chmod +x install.sh && ./install.sh
#
#  On Linux: re-run after reboot to skip Docker install and continue setup.
# ══════════════════════════════════════════════════════════════════════════════

echo ""
echo "================================================================"
echo "  RGSS Williams Portal — Installer"
echo "================================================================"
echo ""

# ── Privilege Escalation ──────────────────────────────────────────────────────
# Re-launches the script with elevated privileges if not already root/admin.
# exec sudo -E preserves the current environment (PATH, etc.) for the new process.
# Source: https://www.gnu.org/software/bash/manual/bash.html#Bourne-Shell-Builtins (exec)

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

ostype=""

get_os() {
    if [[ "$OSTYPE" == linux* ]]; then
        echo "OS detected: Linux"
        read -rp "  Confirm? [y/n]: " confirmation
        [[ "$confirmation" == "y" || "$confirmation" == "Y" ]] && ostype="linux" || ostype="undefined"

    elif [[ "$OSTYPE" == msys* || "$OSTYPE" == cygwin* ]]; then
        echo "OS detected: Windows"
        read -rp "  Confirm? [y/n]: " confirmation
        [[ "$confirmation" == "y" || "$confirmation" == "Y" ]] && ostype="windows" || ostype="undefined"

    elif [[ "$OSTYPE" == darwin* ]]; then
        echo "OS detected: macOS"
        read -rp "  Confirm? [y/n]: " confirmation
        [[ "$confirmation" == "y" || "$confirmation" == "Y" ]] && ostype="osx" || ostype="undefined"

    else
        echo "  [!] Unsupported OS type: $OSTYPE"
        echo "      Supported: Linux, Windows, macOS"
        ostype="undefined"
    fi
}

# ── Docker Check ──────────────────────────────────────────────────────────────
# Returns 0 (true) if Docker is installed and the daemon is reachable.
# Used to skip installation on re-runs after reboot.

check_docker() {
    if command -v docker &>/dev/null && docker info &>/dev/null 2>&1; then
        return 0
    fi
    return 1
}

# ── Docker Installers ─────────────────────────────────────────────────────────

install_docker_linux() {
    echo ""
    echo "==> Installing Docker Engine for Linux..."

    if command -v apt-get &>/dev/null; then

        # Detect whether the distro is Debian or Ubuntu so the correct Docker
        # APT repository is used. Docker maintains separate repos for each.
        # Source: https://docs.docker.com/engine/install/debian/
        #         https://docs.docker.com/engine/install/ubuntu/
        local distro_id
        distro_id=$(. /etc/os-release && echo "$ID")

        case "$distro_id" in
            debian) local docker_repo_url="https://download.docker.com/linux/debian" ;;
            ubuntu) local docker_repo_url="https://download.docker.com/linux/ubuntu" ;;
            *)
                echo "  [!] Unrecognised Debian-family distro: $distro_id"
                echo "      Defaulting to Ubuntu repo — override docker_repo_url if incorrect."
                local docker_repo_url="https://download.docker.com/linux/ubuntu"
                ;;
        esac

        echo "  -> Detected apt (${distro_id^}). Using Docker repo: $docker_repo_url"

        apt-get update -y

        # git is needed for Step 5 (cloning the project repos).
        # ca-certificates + curl are needed for the Docker GPG key download.
        # gnupg is needed if gpg --dearmor is used (not needed for .asc, but
        # kept for compatibility with scripts that may call it directly).
        apt-get install -y ca-certificates curl git gnupg

        # Store the Docker GPG key as a non-armored .asc file.
        # Using -o (output to file) rather than piping through gpg --dearmor
        # is the approach recommended in Docker's current official docs.
        # Source: https://docs.docker.com/engine/install/debian/#install-using-the-repository
        install -m 0755 -d /etc/apt/keyrings
        curl -fsSL "${docker_repo_url}/gpg" -o /etc/apt/keyrings/docker.asc
        chmod a+r /etc/apt/keyrings/docker.asc

        # Write the repo definition in DEB822 format (.sources), which is the
        # modern replacement for the legacy one-liner .list format.
        # $(dpkg --print-architecture) → e.g. amd64, arm64
        # $VERSION_CODENAME → e.g. bookworm, noble
        # Source: https://wiki.debian.org/SourcesList#DEB822_format
        cat > /etc/apt/sources.list.d/docker.sources << EOF
Types: deb
URIs: ${docker_repo_url}
Suites: $(. /etc/os-release && echo "$VERSION_CODENAME")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

        apt-get update -y
        apt-get install -y \
            docker-ce \
            docker-ce-cli \
            containerd.io \
            docker-buildx-plugin \
            docker-compose-plugin

    elif command -v dnf &>/dev/null; then
        echo "  -> Detected dnf (Fedora/RHEL)"
        dnf -y install dnf-plugins-core git
        dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
        dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    elif command -v yum &>/dev/null; then
        echo "  -> Detected yum (CentOS/older RHEL)"
        yum install -y yum-utils git
        yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    elif command -v pacman &>/dev/null; then
        echo "  -> Detected pacman (Arch Linux)"
        pacman -Sy --noconfirm docker git

    else
        echo "  [!] No supported package manager found."
        echo "      Install Docker manually: https://docs.docker.com/engine/install/"
        return 1
    fi

    # Enable the Docker daemon and start it immediately.
    systemctl enable --now docker

    # Add the invoking user (not root) to the docker group so they can run
    # Docker commands without sudo. $SUDO_USER is set by sudo to the original
    # unprivileged username.
    # Source: https://docs.docker.com/engine/install/linux-postinstall/
    if [[ -n "$SUDO_USER" ]]; then
        usermod -aG docker "$SUDO_USER"
        echo ""
        echo "  [OK] Docker Engine installed."
        echo "  [!]  '$SUDO_USER' has been added to the 'docker' group."
        echo ""
        echo "  ┌─────────────────────────────────────────────────────────────┐"
        echo "  │  A reboot is required for the group change to take effect.  │"
        echo "  │  Re-run this script after rebooting to continue setup.      │"
        echo "  └─────────────────────────────────────────────────────────────┘"
        echo ""
        read -rp "  Reboot now? [Y/n]: " reboot_confirm
        if [[ "$reboot_confirm" != "n" && "$reboot_confirm" != "N" ]]; then
            echo "  -> Rebooting..."
            reboot
        else
            echo "  -> Skipping reboot. Run 'newgrp docker' to apply group in the"
            echo "     current shell, or log out and back in."
        fi
    else
        echo "  [OK] Docker Engine installed."
    fi
}

install_docker_mac() {
    echo ""
    echo "==> Installing Docker Desktop for macOS..."

    if ! command -v brew &>/dev/null; then
        echo "  -> Homebrew not found. Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        # Add Homebrew to PATH for Apple Silicon Macs (installs to /opt/homebrew)
        [[ -f /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
    else
        echo "  -> Homebrew already installed: $(brew --version | head -1)"
    fi

    # Install git via Homebrew if not already present
    if ! command -v git &>/dev/null; then
        brew install git
    fi

    # Docker Desktop for macOS — installs the daemon + CLI + Compose plugin
    brew install --cask docker

    echo ""
    echo "  [OK] Docker Desktop installed."
    echo "  [!]  Launch /Applications/Docker.app to complete setup before continuing."
}

install_docker_windows() {
    echo ""
    echo "==> Installing Docker Desktop for Windows..."

    if command -v winget &>/dev/null; then
        winget install --id Docker.DockerDesktop --exact --accept-source-agreements --accept-package-agreements
        winget install --id Git.Git --exact --accept-source-agreements --accept-package-agreements
    elif command -v choco &>/dev/null; then
        choco install docker-desktop git -y
    else
        echo "  [!] Neither winget nor Chocolatey found."
        echo "      Download manually:"
        echo "        Docker: https://www.docker.com/products/docker-desktop/"
        echo "        Git:    https://git-scm.com/download/win"
        return 1
    fi

    echo ""
    echo "  [OK] Docker Desktop and Git installation triggered."
    echo "  [!]  A restart may be required to complete WSL2/Hyper-V setup."
}

# ── Docker Verification (Step 3) ──────────────────────────────────────────────
# Runs the official hello-world image to confirm the daemon, CLI, and image
# pull pipeline are all working end-to-end.
# Source: https://docs.docker.com/get-started/#test-docker-installation

verify_docker() {
    echo ""
    echo "==> Verifying Docker installation..."

    if docker run --rm hello-world &>/dev/null; then
        echo "  [OK] Docker is working correctly (hello-world ran successfully)."
    else
        echo "  [!] Docker verification failed."
        echo "      - Check that the Docker daemon is running: systemctl status docker"
        echo "      - Ensure your user is in the docker group and you have re-logged in."
        echo "      - Run manually: docker run hello-world"
        exit 1
    fi
}

# ── Portainer (Step 4) ────────────────────────────────────────────────────────
# Portainer CE default ports:
#   9000 → HTTP web UI
#   9443 → HTTPS web UI  (preferred)
#   8000 → Edge agent tunnel (not needed here, omitted to avoid conflict with
#           the Django backend which also binds :8000)
# Source: https://docs.portainer.io/start/install-ce/server/docker/linux

install_portainer() {
    echo ""
    echo "==> Installing Portainer CE..."

    # Create the persistent data volume if it doesn't already exist.
    # docker volume inspect exits non-zero if the volume is absent.
    docker volume inspect portainer_data >/dev/null 2>&1 \
        || docker volume create portainer_data

    # Remove any pre-existing Portainer container so we can recreate it cleanly.
    if docker ps -a --format '{{.Names}}' | grep -q '^portainer$'; then
        echo "  -> Existing Portainer container found — removing it..."
        docker rm -f portainer >/dev/null 2>&1
    fi

    # --restart=unless-stopped: restarts on crash/daemon-restart but respects
    # a manual 'docker stop portainer', which is better for a dev environment.
    # 'always' would ignore manual stops — less desirable here.
    # Source: https://docs.docker.com/config/containers/start-containers-automatically/
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
    echo "  [OK] Web UI (HTTPS): https://localhost:9443"
    echo "  [OK] Web UI (HTTP):  http://localhost:9000"
}

# ── Utilities ─────────────────────────────────────────────────────────────────

# Generates a cryptographically secure random hex string.
# Priority: openssl (cross-platform) → python3 secrets → /dev/urandom (Linux/macOS kernel CSPRNG).
# 32 bytes = 64 hex chars, which exceeds Django's recommended 50-char SECRET_KEY length.
# Source: https://docs.djangoproject.com/en/5.0/ref/settings/#secret-key
#         https://www.openssl.org/docs/man3.0/man1/openssl-rand.html
#         https://man7.org/linux/man-pages/man4/urandom.4.html

generate_secret() {
    local bytes="${1:-32}"
    if command -v openssl &>/dev/null; then
        openssl rand -hex "$bytes"
    elif command -v python3 &>/dev/null; then
        python3 -c "import secrets; print(secrets.token_hex($bytes))"
    else
        # /dev/urandom is non-blocking and cryptographically safe on Linux ≥ 4.8 and macOS.
        cat /dev/urandom | tr -dc 'a-f0-9' | head -c "$((bytes * 2))"
    fi
}

# Downloads a file with curl (preferred) or wget.
# -fsSL: fail on HTTP errors, silent, follow redirects.
# Source: https://curl.se/docs/manpage.html

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

# Clones a git repo into a target directory, or pulls latest if it already exists.
# 'git clone' is used for fresh checkouts; 'git pull' only works on existing repos.
# Source: https://git-scm.com/docs/git-clone
#         https://git-scm.com/docs/git-pull

clone_or_pull() {
    local repo_url="$1"
    local target_dir="$2"

    if [[ -d "$target_dir/.git" ]]; then
        echo "  -> '$target_dir' already cloned — pulling latest..."
        git -C "$target_dir" pull
    else
        echo "  -> Cloning into '$target_dir'..."
        git clone "$repo_url" "$target_dir"
    fi
}

# Prompts the user for input; result written to global $PROMPT_RESULT.
# Using a global avoids subshell issues where 'read' inside $() cannot access
# /dev/tty on all platforms.

PROMPT_RESULT=""

prompt_var() {
    local label="$1"
    local default="$2"
    local secret="${3:-false}"

    if [[ "$secret" == "true" ]]; then
        # -s suppresses echo for passwords
        read -rsp "  $label (hidden): " PROMPT_RESULT
        echo ""
    elif [[ -n "$default" ]]; then
        read -rp "  $label [$default]: " PROMPT_RESULT
        PROMPT_RESULT="${PROMPT_RESULT:-$default}"
    else
        read -rp "  $label: " PROMPT_RESULT
    fi
}

# ── Project Setup (Steps 5 & 6) ───────────────────────────────────────────────

BACKEND_REPO="https://github.com/RGSS-CS/williams-rgss-website-dev-backend.git"
FRONTEND_REPO="https://github.com/RGSS-CS/williams-rgss-website-dev-frontend.git"

setup_backend() {
    echo ""
    echo "==> Setting up backend..."

    # Step 5: Clone (or update) the backend repository.
    # The repo contains compose.yml and all application source.
    clone_or_pull "$BACKEND_REPO" "backend" || return 1
    echo "  [OK] Backend repository ready."

    # Step 6: Generate secrets and write backend/.env
    echo ""
    echo "  Generating secrets..."

    # Django SECRET_KEY: must be unpredictable and unique per deployment.
    # 32 bytes = 64 hex chars — well above Django's 50-char minimum.
    # Source: https://docs.djangoproject.com/en/5.0/ref/settings/#secret-key
    local secret_key
    secret_key=$(generate_secret 32)

    # PostgreSQL password: 24 bytes = 48 hex chars.
    local postgres_password
    postgres_password=$(generate_secret 24)

    echo "  [AUTO] SECRET_KEY        → ${secret_key:0:12}... (truncated)"
    echo "  [AUTO] POSTGRES_PASSWORD → ${postgres_password:0:8}... (truncated)"
    echo ""
    echo "  Provide remaining values (Enter = accept [default]):"
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

    # Default user is 'app' per project spec.
    # Using a non-superuser account for the application follows the principle
    # of least privilege — the app user only needs access to its own DB.
    # Source: https://www.postgresql.org/docs/current/sql-createrole.html
    prompt_var "POSTGRES_USER" "app"
    local postgres_user="$PROMPT_RESULT"

    # Heredoc with quoted delimiter ('EOF') prevents variable expansion inside
    # the content — all values are written as literal strings.
    cat > "backend/.env" << 'ENVEOF'
# ── Django ─────────────────────────────────────────────────────────────────
# AUTO-GENERATED by install.sh — do NOT commit this file
ENVEOF

    # Append the actual values (unquoted heredoc so variables expand here)
    cat >> "backend/.env" << EOF
SECRET_KEY=${secret_key}
ALLOWED_HOSTS=${allowed_hosts}
CSRF_TRUSTED_ORIGINS=${csrf_origins}
DJANGO_SUPERUSER_USERNAME=${superuser_username}
DJANGO_SUPERUSER_EMAIL=${superuser_email}
DJANGO_SUPERUSER_PASSWORD=${superuser_password}

# ── PostgreSQL ─────────────────────────────────────────────────────────────
# AUTO-GENERATED by install.sh — do NOT commit this file
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

    # Step 5: Clone (or update) the frontend repository.
    clone_or_pull "$FRONTEND_REPO" "frontend" || return 1
    echo "  [OK] Frontend repository ready."

    # Step 6: Generate secrets and write frontend/.env
    echo ""
    echo "  Generating secrets..."

    # ADMIN_KEY secures internal admin API routes — treat as a password.
    local admin_key
    admin_key=$(generate_secret 24)
    echo "  [AUTO] ADMIN_KEY → ${admin_key:0:8}... (truncated)"
    echo ""
    echo "  Provide remaining values:"
    echo ""

    # NEXT_PUBLIC_API_URL is embedded into the browser bundle at BUILD TIME,
    # not at runtime. Changing this value only takes effect if the Docker image
    # is rebuilt locally — the pre-built GHCR image has the build-time value fixed.
    # Source: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
    prompt_var "NEXT_PUBLIC_API_URL (public-facing API URL)" "https://api.rgsscs.org"
    local next_public_api_url="$PROMPT_RESULT"

    cat > "frontend/.env" << 'ENVEOF'
# ── Frontend ───────────────────────────────────────────────────────────────
# AUTO-GENERATED by install.sh — do NOT commit this file
ENVEOF

    cat >> "frontend/.env" << EOF
# Internal Docker-network URL for Next.js server-side fetches (SSR/RSC).
# 'backend' resolves via Docker Compose's internal DNS on the shared network.
API_URL=http://backend:8000

# Public URL baked into the browser bundle at build time (NEXT_PUBLIC_* vars).
# Only applies if you rebuild the Docker image locally — pre-built GHCR images
# have this value fixed at the time they were built.
NEXT_PUBLIC_API_URL=${next_public_api_url}

# ── Captcha / Admin ────────────────────────────────────────────────────────
ADMIN_KEY=${admin_key}
REDIS_URL=redis://valkey:6379
EOF

    echo ""
    echo "  [OK] frontend/.env written."
}

# Creates the shared Docker bridge network both Compose stacks attach to.
# Both compose files declare it as 'external: true', so it must exist before
# 'docker compose up' is run on either stack.
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
echo ""

# Step 1 + 2: Install Docker (skipped if already present — handles re-runs after reboot)
if check_docker; then
    echo "==> Docker is already installed and running. Skipping installation."
else
    case "$ostype" in
        linux)   install_docker_linux ;;
        osx)     install_docker_mac ;;
        windows) install_docker_windows ;;
        *)
            echo "[!] OS undefined or unsupported — exiting."
            exit 1 ;;
    esac

    # On Linux the script may have rebooted above. If it didn't (user declined
    # or non-Linux), verify Docker is now reachable before continuing.
    if ! check_docker; then
        echo ""
        echo "[!] Docker does not appear to be running after installation."
        echo "    - On Linux: reboot and re-run this script."
        echo "    - On macOS: open Docker.app first, then re-run."
        echo "    - On Windows: restart and re-run after Docker Desktop starts."
        exit 1
    fi
fi

# Step 3: Verify Docker with hello-world
verify_docker

# Step 4: Install Portainer
install_portainer

# ── Project Setup Prompt ──────────────────────────────────────────────────────

echo ""
read -rp "==> Set up the RGSS Williams portal project? [Y/n]: " setup_confirm
if [[ "$setup_confirm" == "n" || "$setup_confirm" == "N" ]]; then
    echo "  Skipping project setup."
    exit 0
fi

prompt_var "Project directory" "./williams-portal"
project_dir="$PROMPT_RESULT"

mkdir -p "$project_dir"
cd "$project_dir" || { echo "[!] Could not enter $project_dir — exiting."; exit 1; }

# Steps 5 + 6
setup_backend  || { echo "[!] Backend setup failed."; exit 1; }
setup_frontend || { echo "[!] Frontend setup failed."; exit 1; }

create_shared_network

echo ""
echo "================================================================"
echo "  Setup complete!"
echo ""
echo "  Files written:"
echo "    $(pwd)/backend/.env         ← KEEP SECRET — never commit"
echo "    $(pwd)/frontend/.env        ← KEEP SECRET — never commit"
echo ""
echo "  Repository source:"
echo "    $(pwd)/backend/             ← cloned from GitHub"
echo "    $(pwd)/frontend/            ← cloned from GitHub"
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
echo "  -> Starting frontend (Next.js + Valkey)..."
docker compose -f frontend/compose.yml up -d

echo ""
echo "================================================================"
echo "  Services started:"
echo "    Frontend  → http://localhost:3000"
echo "    Backend   → http://localhost:8000"
echo "    Portainer → https://localhost:9443"
echo "================================================================"