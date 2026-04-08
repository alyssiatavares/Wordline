# ---------- Base ----------
FROM docker.io/oven/bun:1 AS base
WORKDIR /app
RUN bun add -g turbo@2.9.5

# ---------- Prune ----------
FROM base AS prune
COPY . .
RUN turbo prune @wordline/client --docker

# ---------- Install ----------
FROM oven/bun:1 AS install
WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN bun install
COPY --from=prune /app/out/full/ .

# ---------- Build ----------
FROM install AS build
WORKDIR /app/packages/client
RUN bun run build

# ---------- Serve ----------
FROM docker.io/caddy:2
# Caddyfile lives at the repo root alongside docker-compose.yml.
# The build context for this service is the repo root (see docker-compose.yml).
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/packages/client/dist /usr/share/caddy
