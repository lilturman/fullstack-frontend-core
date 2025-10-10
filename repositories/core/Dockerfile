# 🔧 Build stage
FROM node:22-slim AS builder

WORKDIR /app

# 1) Install deps with best cache usage
COPY package*.json ./
RUN npm ci

# 2) Copy only what we need to build
COPY tsconfig.json ./
COPY src ./src
COPY types ./types

# 3) Build to ESM bundle (dist/)
RUN npm run build

# 4) Prune dev deps for runtime
RUN npm prune --omit=dev

# 🛡️ Runtime stage
FROM node:22-slim AS production
WORKDIR /app

# (optional) Install curl for container healthchecks
RUN apt-get update -y && apt-get install -y --no-install-recommends curl \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# 5) Copy runtime artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=8000
# Useful for stack traces if you later enable source maps
ENV NODE_OPTIONS=--enable-source-maps

EXPOSE 8000

# (optional) basic container-level healthcheck (works because we installed curl)
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD curl -fsS http://localhost:${PORT}/health || exit 1

CMD ["node", "dist/index.mjs"]
