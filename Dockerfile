# ---------- Base ----------
FROM oven/bun:1 AS base
WORKDIR /app

# Install turbo globally
RUN bun add -g turbo@2.9.5


# ---------- Prune (important step) ----------
FROM base AS prune

COPY . .

# Create a minimal monorepo for the server
RUN turbo prune @wordline/server --docker


# ---------- Install deps ----------
FROM oven/bun:1 AS install
WORKDIR /app

# Copy pruned files
COPY --from=prune /app/out/json/ .
RUN bun install

# Copy source
COPY --from=prune /app/out/full/ .


# ---------- Backend ----------
FROM install AS backend
WORKDIR /app/packages/server

EXPOSE 3000
CMD ["bun", "run", "start"]


# ---------- Frontend build ----------
FROM install AS frontend-build
WORKDIR /app/packages/client

RUN bun run build


# ---------- Frontend runtime ----------
FROM caddy:2 AS frontend

COPY --from=frontend-build /app/packages/client/dist /usr/share/caddy
