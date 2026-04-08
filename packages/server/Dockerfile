# ---------- Base ----------
FROM docker.io/oven/bun:1 AS base
WORKDIR /app
RUN bun add -g turbo@2.9.5

# ---------- Prune ----------
FROM base AS prune
COPY . .
RUN turbo prune @wordline/server --docker

# ---------- Install ----------
FROM oven/bun:1 AS install
WORKDIR /app
COPY --from=prune /app/out/json/ .
RUN bun install
COPY --from=prune /app/out/full/ .

# ---------- Run ----------
FROM install AS runner
WORKDIR /app/packages/server
EXPOSE 3000
CMD ["bun", "run", "start"]
