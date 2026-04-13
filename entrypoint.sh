#!/bin/bash
set -e

cd /app/backend
python -m uvicorn src.wordline.main:app --host 0.0.0.0 --port 3000 &

exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
