# Frontend
API_URL=http://backend:8000
FRONTEND_REVALIDATE_URL=http://frontend:3000/api/revalidate
REVALIDATE_SECRET=

# CAP captcha
# ADMIN_KEY is used to log in to the CAP dashboard. Use a long random value.
ADMIN_KEY=your_secret_password

# CAP stores its data in Valkey/Redis. In Docker Compose, `valkey` resolves
# through the internal Compose network.
REDIS_URL=redis://valkey:6379
