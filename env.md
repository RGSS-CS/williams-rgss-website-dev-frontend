# Frontend
API_URL=http://backend:8000
# Public origin used for backend-hosted images (for example, https://example.com).
# The original /media/... path, query string, and hash are retained.
PUBLIC_MEDIA_BASE_URL=
FRONTEND_REVALIDATE_URL=http://frontend:3000/api/revalidate
REVALIDATE_SECRET=

# Registration URL verification
# A base64url-encoded 32-byte AES key shared with the backend. The `rel`
# parameter uses AES-256-GCM: nonce (12 bytes) + ciphertext + auth tag (16 bytes).
REGISTRATION_URL_AES_KEY=

# CAP captcha
# ADMIN_KEY is used to log in to the CAP dashboard. Use a long random value.
ADMIN_KEY=your_secret_password

# CAP stores its data in Valkey/Redis. In Docker Compose, `valkey` resolves
# through the internal Compose network.
REDIS_URL=redis://valkey:6379
