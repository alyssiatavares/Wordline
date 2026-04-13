FROM docker.io/oven/bun:1 AS builder
WORKDIR /app/frontend
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

FROM docker.io/caddy:2
COPY --from=builder /app/frontend/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
