# Frontend
API_URL=http://backend:8000
FRONTEND_REVALIDATE_URL=http://frontend:3000/api/revalidate
REVALIDATE_SECRET=

# Application invite URL verification
# 32 random bytes, base64url encoded. This must be the same value used by the
# backend to encrypt application_form_link values with AES-256-GCM.
APPLICATION_URL_AES_KEY=

# CAP captcha
# ADMIN_KEY is used to log in to the CAP dashboard. Use a long random value.
ADMIN_KEY=your_secret_password

# CAP stores its data in Valkey/Redis. In Docker Compose, `valkey` resolves
# through the internal Compose network.
REDIS_URL=redis://valkey:6379
