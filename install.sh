#!/bin/bash

# ══════════════════════════════════════════════════════════════════════════════
#  Project Installer
#  Installs Docker, Portainer, and sets up the backend + frontend project.
#
#  Usage:
#    chmod +x install.sh && ./install.sh
#
#  On Linux: if a reboot is required (new docker group membership), the script
#  registers a one-shot systemd service that automatically re-runs this script
#  on the next boot and logs all output. No manual re-run is needed.
#
#  Optional: on Linux, the script can also enable automatic console (tty1)
#  login for the invoking user so the machine doesn't sit at a login prompt
#  after the unattended reboot. This is purely a convenience for headless/VM
#  setups and is removed automatically once setup finishes — see
#  setup_auto_login_linux() / cleanup_auto_login_linux() below.
#  Source: man systemd.unit (drop-in override files), man agetty (--autologin)
# ══════════════════════════════════════════════════════════════════════════════

echo ""
echo "================================================================"
echo "  Project Installer"
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

# ── Logging ────────────────────────────────────────────────────────────────────
# Every run (whether started manually or auto-resumed after a reboot) tees its
# output to a log file so the result of an unattended/automatic run can be
# reviewed afterwards.
# Source: https://www.gnu.org/software/bash/manual/bash.html#Process-Substitution

if [[ "$OSTYPE" == msys* || "$OSTYPE" == cygwin* ]]; then
    LOG_FILE="$(dirname "$(realpath "$0")")/install.log"
else
    LOG_FILE="/var/log/install.log"
fi

exec > >(tee -a "$LOG_FILE") 2>&1
echo "==> Logging this run to: $LOG_FILE"

# ── OS Detection ──────────────────────────────────────────────────────────────
# Determined automatically from bash's built-in $OSTYPE — no user confirmation
# required.
# Source: https://www.gnu.org/software/bash/manual/bash.html#Bash-Variables (OSTYPE)

ostype=""

get_os() {
    case "$OSTYPE" in
        linux*)
            ostype="linux"
            ;;
        darwin*)
            ostype="osx"
            ;;
        msys*|cygwin*)
            ostype="windows"
            ;;
        *)
            echo "  [!] Unsupported OS type: $OSTYPE"
            echo "      Supported: Linux, Windows, macOS"
            ostype="undefined"
            ;;
    esac

    echo "==> Detected OS: $ostype (\$OSTYPE=$OSTYPE)"
}

# ── Docker Check ──────────────────────────────────────────────────────────────
# Returns 0 (true) if Docker is installed and the daemon is reachable.
# Used to skip installation on re-runs (e.g. after an auto-resume reboot).

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
        apt-get install -y ca-certificates curl git gnupg

        install -m 0755 -d /etc/apt/keyrings
        curl -fsSL "${docker_repo_url}/gpg" -o /etc/apt/keyrings/docker.asc
        chmod a+r /etc/apt/keyrings/docker.asc

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
        echo "  A reboot is required for the group change to take effect."
        echo "  This script will register itself to continue automatically"
        echo "  after the reboot — no manual re-run needed."
        echo ""

        setup_resume_service

        echo ""
        echo "  Optional: enable automatic console login for '$SUDO_USER' on tty1"
        echo "  until setup finishes? This lets you watch the install log right"
        echo "  after reboot without typing a password. It is removed"
        echo "  automatically once Docker is verified working."
        echo "  Security note: while enabled, anyone with physical/console"
        echo "  access gets a shell as '$SUDO_USER' with no password prompt."
        read -rp "  Enable temporary auto-login? [y/N]: " autologin_confirm
        if [[ "$autologin_confirm" == "y" || "$autologin_confirm" == "Y" ]]; then
            setup_auto_login_linux "$SUDO_USER"
        fi

        echo ""
        read -rp "  Reboot now? [Y/n]: " reboot_confirm
        if [[ "$reboot_confirm" != "n" && "$reboot_confirm" != "N" ]]; then
            echo "  -> Rebooting..."
            reboot
        else
            echo "  -> Skipping reboot for now."
            echo "     Setup will continue automatically the next time this machine boots."
            echo "     (Or run 'newgrp docker' / log out and back in, then re-run this script manually.)"
            exit 0
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
        [[ -f /opt/homebrew/bin/brew ]] && eval "$(/opt/homebrew/bin/brew shellenv)"
    else
        echo "  -> Homebrew already installed: $(brew --version | head -1)"
    fi

    if ! command -v git &>/dev/null; then
        brew install git
    fi

    brew install --cask docker

    echo ""
    echo "  [OK] Docker Desktop installed."
    echo "  [!]  Launch /Applications/Docker.app to complete setup, then re-run this script."
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
    echo "  [!]  A restart may be required to complete WSL2/Hyper-V setup, then re-run this script."
}

# ── Docker Verification ───────────────────────────────────────────────────────
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

# ── Auto-Resume After Reboot ──────────────────────────────────────────────────
# Registers a one-shot systemd service that re-runs this script on the next
# boot, so the user doesn't have to manually re-invoke it after the reboot
# triggered by a fresh Docker install (new 'docker' group membership).
# Output is appended to $LOG_FILE via StandardOutput/StandardError.
# Source: man systemd.service — "Type=oneshot", "WantedBy=", "StandardOutput="

RESUME_SERVICE_PATH="/etc/systemd/system/install-resume.service"

setup_resume_service() {
    if [[ "$ostype" != "linux" ]]; then
        return 0
    fi

    if ! command -v systemctl &>/dev/null; then
        echo "  [!] systemd not found — cannot auto-resume after reboot."
        echo "      Re-run this script manually after rebooting."
        return 1
    fi

    local script_path
    script_path="$(realpath "$0")"

    cat > "$RESUME_SERVICE_PATH" << EOF
[Unit]
Description=Resume project installer after reboot
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/bin/bash ${script_path}
StandardOutput=append:${LOG_FILE}
StandardError=append:${LOG_FILE}

[Install]
WantedBy=multi-user.target
EOF

    systemctl daemon-reload
    systemctl enable install-resume.service

    echo "  [OK] Registered auto-resume service: $RESUME_SERVICE_PATH"
    echo "       On next boot, install.sh will continue automatically."
    echo "       Output is logged to: $LOG_FILE"
}

cleanup_resume_service() {
    if [[ "$ostype" != "linux" ]]; then
        return 0
    fi

    if [[ -f "$RESUME_SERVICE_PATH" ]] && command -v systemctl &>/dev/null; then
        echo "==> Removing auto-resume service (no longer needed)..."
        systemctl disable install-resume.service &>/dev/null
        rm -f "$RESUME_SERVICE_PATH"
        systemctl daemon-reload
    fi

    cleanup_auto_login_linux
}

# ── Auto-Login After Reboot (optional) ────────────────────────────────────────
# The systemd resume service above already runs on boot without anyone logging
# in (WantedBy=multi-user.target doesn't require a session). This is purely an
# extra convenience for someone sitting at the machine: it skips the console
# login prompt on tty1 so the in-progress install log is immediately visible
# after the automatic reboot. It is reverted automatically by
# cleanup_resume_service() once Docker is confirmed working.
#
# SECURITY NOTE: while enabled, anyone with physical/console access to tty1
# gets a logged-in shell as the specified user with NO password prompt. Only
# enable this on a trusted machine, and only for the duration of the install.
# Source: man systemd.unit (drop-in override directories, "*.service.d/")
#         man agetty — "--autologin" option

AUTOLOGIN_OVERRIDE_DIR="/etc/systemd/system/getty@tty1.service.d"
AUTOLOGIN_OVERRIDE_FILE="${AUTOLOGIN_OVERRIDE_DIR}/autologin.conf"

setup_auto_login_linux() {
    local user="$1"

    if [[ -z "$user" ]]; then
        echo "  [!] No user specified — skipping auto-login setup."
        return 1
    fi

    if ! command -v systemctl &>/dev/null; then
        echo "  [!] systemd not found — cannot configure auto-login."
        return 1
    fi

    mkdir -p "$AUTOLOGIN_OVERRIDE_DIR"

    # Empty ExecStart= clears the default, the following line redefines it
    # with --autologin so getty drops straight into a shell as $user.
    cat > "$AUTOLOGIN_OVERRIDE_FILE" << EOF
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin ${user} --noclear %I \$TERM
EOF

    systemctl daemon-reload

    echo "  [OK] Console auto-login enabled for '${user}' on tty1."
    echo "  [!]  This will be removed automatically once setup completes."
    echo "       To remove it manually:"
    echo "         rm -rf ${AUTOLOGIN_OVERRIDE_DIR} && systemctl daemon-reload"
}

cleanup_auto_login_linux() {
    if [[ -f "$AUTOLOGIN_OVERRIDE_FILE" ]] && command -v systemctl &>/dev/null; then
        echo "==> Removing console auto-login override (no longer needed)..."
        rm -rf "$AUTOLOGIN_OVERRIDE_DIR"
        systemctl daemon-reload
    fi
}

# ── Portainer ─────────────────────────────────────────────────────────────────
# Portainer CE default ports:
#   9000 → HTTP web UI
#   9443 → HTTPS web UI  (preferred)
# Source: https://docs.portainer.io/start/install-ce/server/docker/linux

install_portainer() {
    echo ""
    echo "==> Installing Portainer CE..."

    docker volume inspect portainer_data >/dev/null 2>&1 \
        || docker volume create portainer_data

    if docker ps -a --format '{{.Names}}' | grep -q '^portainer$'; then
        echo "  -> Existing Portainer container found — removing it..."
        docker rm -f portainer >/dev/null 2>&1
    fi

    # --restart=unless-stopped: restarts on crash/daemon-restart but respects
    # a manual 'docker stop portainer'.
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

# Generates a cryptographically random hex string.
# Uses openssl first (available on all platforms), falls back to python3 or /dev/urandom.
# Source: https://www.openssl.org/docs/man3.0/man1/openssl-rand.html
#         https://man7.org/linux/man-pages/man4/urandom.4.html
generate_secret() {
    local bytes="${1:-32}"  # 32 bytes = 64 hex chars — well above Django's recommended 50-char key
    if command -v openssl &>/dev/null; then
        openssl rand -hex "$bytes"
    elif command -v python3 &>/dev/null; then
        python3 -c "import secrets; print(secrets.token_hex($bytes))"
    else
        cat /dev/urandom | tr -dc 'a-f0-9' | head -c "$((bytes * 2))"
    fi
}

# Downloads a file with curl (preferred) or wget.
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
# If no terminal is attached (e.g. running unattended via the resume service),
# 'read' returns immediately/empty, so the default value is used automatically.
# An optional 4th argument prints a short explanatory line above the prompt,
# so the user knows what the value is for and where it ends up.
PROMPT_RESULT=""
prompt_var() {
    local label="$1"
    local default="$2"
    local secret="${3:-false}"
    local help="${4:-}"

    if [[ -n "$help" ]]; then
        echo "  ${help}"
    fi

    if [[ "$secret" == "true" ]]; then
        read -rsp "  $label (hidden): " PROMPT_RESULT
        echo ""
        PROMPT_RESULT="${PROMPT_RESULT:-$default}"
    elif [[ -n "$default" ]]; then
        read -rp "  $label [$default]: " PROMPT_RESULT
        PROMPT_RESULT="${PROMPT_RESULT:-$default}"
    else
        read -rp "  $label: " PROMPT_RESULT
    fi
}

# ── Project Setup ─────────────────────────────────────────────────────────────

BACKEND_REPO="https://github.com/RGSS-CS/williams-rgss-website-dev-backend.git"
FRONTEND_COMPOSE_RAW="https://raw.githubusercontent.com/RGSS-CS/williams-rgss-website-dev-frontend/main/compose.yml"

setup_backend() {
    echo ""
    echo "==> Setting up backend..."

    # Clone (or update) the backend repository — it contains its own
    # compose.yml plus the Django application source.
    clone_or_pull "$BACKEND_REPO" "backend" || return 1
    echo "  [OK] Backend repository ready."

    if [[ -f "backend/.env" ]]; then
        echo "  -> backend/.env already exists — leaving it untouched."
        return 0
    fi

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

    prompt_var "ALLOWED_HOSTS" "localhost,backend" "" \
        "ALLOWED_HOSTS — comma-separated hostnames/IPs Django will accept requests for (no spaces). Add your domain here too, e.g. localhost,backend,api.example.com. https://docs.djangoproject.com/en/5.0/ref/settings/#allowed-hosts"
    local allowed_hosts="$PROMPT_RESULT"

    prompt_var "CSRF_TRUSTED_ORIGINS" "http://localhost" "" \
        "CSRF_TRUSTED_ORIGINS — comma-separated origins (with scheme, e.g. https://example.com) that are trusted to make POST requests, such as your frontend's URL. https://docs.djangoproject.com/en/5.0/ref/settings/#csrf-trusted-origins"
    local csrf_origins="$PROMPT_RESULT"

    prompt_var "DJANGO_SUPERUSER_USERNAME" "admin" "" \
        "Username for the initial Django admin account (used to log into /admin)."
    local superuser_username="$PROMPT_RESULT"

    prompt_var "DJANGO_SUPERUSER_EMAIL" "" "" \
        "Email for the admin account (optional — used for password-reset emails)."
    local superuser_email="$PROMPT_RESULT"

    prompt_var "DJANGO_SUPERUSER_PASSWORD" "" "true" \
        "Password for the admin account. Input is hidden; leave blank to auto-generate a secure random password."
    local superuser_password="$PROMPT_RESULT"
    if [[ -z "$superuser_password" ]]; then
        superuser_password=$(generate_secret 12)
        echo "  [AUTO] DJANGO_SUPERUSER_PASSWORD → ${superuser_password:0:4}... (truncated, auto-generated)"
    fi

    prompt_var "POSTGRES_DB" "appdb" "" \
        "Name of the PostgreSQL database the backend will use."
    local postgres_db="$PROMPT_RESULT"

    # Non-superuser app account, per least-privilege principle.
    # Source: https://www.postgresql.org/docs/current/sql-createrole.html
    prompt_var "POSTGRES_USER" "appuser" "" \
        "Non-superuser PostgreSQL role the backend connects as (least-privilege)."
    local postgres_user="$PROMPT_RESULT"

    # Heredoc with quoted delimiter ('EOF') prevents variable expansion inside
    # the content — all values are written as literal strings.
    cat > "backend/.env" << 'ENVEOF'
# ── Django ─────────────────────────────────────────────────────────────────
# AUTO-GENERATED by install.sh — do NOT commit this file
ENVEOF

    # Append the actual values (unquoted heredoc so variables expand here).
    cat >> "backend/.env" << EOF
SECRET_KEY=${secret_key}
ALLOWED_HOSTS=${allowed_hosts}
CSRF_TRUSTED_ORIGINS=${csrf_origins}
DJANGO_SUPERUSER_USERNAME=${superuser_username}
DJANGO_SUPERUSER_EMAIL=${superuser_email}
DJANGO_SUPERUSER_PASSWORD=${superuser_password}

# ── PostgreSQL ─────────────────────────────────────────────────────────────
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
    download_file "$FRONTEND_COMPOSE_RAW" "frontend/compose.yml" || return 1
    echo "  [OK] frontend/compose.yml downloaded."

    if [[ -f "frontend/.env" ]]; then
        echo "  -> frontend/.env already exists — leaving it untouched."
        return 0
    fi

    echo ""
    echo "  Generating secrets..."

    local admin_key
    admin_key=$(generate_secret 24)
    echo "  [AUTO] ADMIN_KEY → ${admin_key:0:8}... (truncated)"

    cat > "frontend/.env" << 'ENVEOF'
# ── Frontend ───────────────────────────────────────────────────────────────
# AUTO-GENERATED by install.sh — do NOT commit this file
ENVEOF

    cat >> "frontend/.env" << EOF
# Internal Docker-network URL for Next.js server-side fetches (SSR/RSC).
# 'backend' resolves via Docker Compose's internal DNS on the shared network.
API_URL=http://backend:8000

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

if [[ "$ostype" == "undefined" ]]; then
    echo "[!] OS undefined or unsupported — exiting."
    exit 1
fi

# Step 1 + 2: Install Docker (skipped if already present — handles re-runs
# triggered automatically after a reboot)
if check_docker; then
    echo "==> Docker is already installed and running. Skipping installation."
else
    case "$ostype" in
        linux)   install_docker_linux ;;
        osx)     install_docker_mac ;;
        windows) install_docker_windows ;;
    esac

    if ! check_docker; then
        echo ""
        echo "[!] Docker does not appear to be running after installation."
        echo "    - On Linux: this is expected if a reboot was deferred — the"
        echo "      install will resume automatically on next boot."
        echo "    - On macOS: open Docker.app first, then re-run this script."
        echo "    - On Windows: restart and re-run this script after Docker Desktop starts."
        exit 1
    fi
fi

# Step 3: Verify Docker with hello-world
verify_docker

# Now that Docker is confirmed working, the post-reboot resume service (if
# any) has done its job — remove it so it doesn't fire on future boots.
cleanup_resume_service

# Step 4: Install Portainer
install_portainer

# ── Project Setup Prompt ──────────────────────────────────────────────────────

echo ""
read -rp "==> Set up the project? [Y/n]: " setup_confirm
if [[ "$setup_confirm" == "n" || "$setup_confirm" == "N" ]]; then
    echo "  Skipping project setup."
    exit 0
fi

prompt_var "Project directory" "./project"
project_dir="$PROMPT_RESULT"

mkdir -p "$project_dir"
cd "$project_dir" || { echo "[!] Could not enter $project_dir — exiting."; exit 1; }

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
echo "  Repository / compose sources:"
echo "    $(pwd)/backend/             ← cloned from GitHub"
echo "    $(pwd)/frontend/compose.yml ← downloaded from GitHub"
echo "================================================================"
echo ""

read -rp "==> Start services now with docker compose? [Y/n]: " start_confirm
if [[ "$start_confirm" == "n" || "$start_confirm" == "N" ]]; then
    echo ""
    echo "  To start manually later:"
    echo "    cd $(pwd)/backend  && docker compose up -d --wait"
    echo "    cd $(pwd)/frontend && docker compose up -d --wait"
    exit 0
fi

echo ""
echo "  -> Starting backend (PostgreSQL + Django)..."
docker compose -f backend/compose.yml up -d --wait

echo ""
echo "  -> Starting frontend (Next.js + Valkey)..."
docker compose -f frontend/compose.yml up -d --wait

echo ""
echo "================================================================"
echo "  Services started:"
echo "    Frontend  → http://localhost:3000"
echo "    Backend   → http://localhost:8000"
echo "    Portainer → https://localhost:9443"
echo "================================================================"