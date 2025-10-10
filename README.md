# fullstack-backend-core

<p align="center"> <img src="./assets/banner.png" alt="Fullstack Backend Core — Leonobitech" width="100%" /> </p>

Core API in **Node 22 + TypeScript (ESM)** with **hexagonal architecture**. Uses **`tsx`** (watch) for dev and **`pkgroll`** (ESM bundle) for build. **Pretty logs in dev**, **structured JSON in prod** via **pino**.

**FROM LOCALHOST TO PRODUCTION — BUILT LIKE A HACKER**

<p align="center"> <!-- Repo metrics --> <a href="https://github.com/leonobitech/fullstack-infrastructure-blueprint/stargazers"> <img src="https://img.shields.io/github/stars/leonobitech/fullstack-infrastructure-blueprint?style=flat-square" alt="GitHub stars" /> </a> <a href="https://github.com/leonobitech/fullstack-infrastructure-blueprint/network/members"> <img src="https://img.shields.io/github/forks/leonobitech/fullstack-infrastructure-blueprint?style=flat-square" alt="GitHub forks" /> </a> <a href="https://github.com/leonobitech/fullstack-infrastructure-blueprint/issues"> <img src="https://img.shields.io/github/issues/leonobitech/fullstack-infrastructure-blueprint?style=flat-square" alt="Open issues" /> </a> <a href="https://github.com/leonobitech/fullstack-infrastructure-blueprint/blob/main/LICENSE"> <img src="https://img.shields.io/github/license/leonobitech/fullstack-infrastructure-blueprint?style=flat-square" alt="License" /> </a> <img src="https://img.shields.io/github/last-commit/leonobitech/fullstack-infrastructure-blueprint?style=flat-square" alt="Last commit" /> <br/> <!-- Tech badges --> <a href="https://www.docker.com/"> <img src="https://img.shields.io/badge/Docker-ready-blue.svg?style=flat-square" alt="Docker" /> </a> <a href="https://traefik.io/"> <img src="https://img.shields.io/badge/Traefik-3.x-green.svg?style=flat-square" alt="Traefik 3.x" /> </a> <a href="https://github.com/FiloSottile/mkcert"> <img src="https://img.shields.io/badge/HTTPS-mkcert-orange.svg?style=flat-square" alt="HTTPS mkcert" /> </a> <img src="https://img.shields.io/badge/status-stable-success.svg?style=flat-square" alt="Status: stable" /> </p>

---

## Bootstrap

```bash
mkdir fullstack-backend-core && cd fullstack-backend-core
npm init -y

```

## `package.json` (ESM + scripts)

```json
{
  "name": "@repositories/core",
  "version": "0.1.0",
  "description": "fullstack-backend-core",
  "type": "module",
  "main": "dist/index.js",
  "exports": "./dist/index.mjs",
  "engines": { "node": ">=22.20.0" },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "pkgroll",
    "start": "node dist/index.mjs",
    "test": "echo \"No test suite defined yet.\" && exit 0"
  },
  "keywords": ["leonobitech", "microservice", "core", "typescript", "express"],
  "author": "Leonobitech",
  "license": "MIT"
}
```

## Install dependencies

```bash
npm i express cors cookie-parser zod dotenv pino pino-http
npm i -D typescript tsx pkgroll pino-pretty @types/node @types/express @types/cors @types/cookie-parser

```

Your `package.json` will have something like:

```json
{
  "dependencies": {
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.x",
    "express": "^5.1.0",
    "pino": "^10.x",
    "pino-http": "^11.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "@types/cookie-parser": "^1.4.x",
    "@types/cors": "^2.8.x",
    "@types/express": "^5.0.x",
    "@types/node": "^22.x",
    "pino-pretty": "^13.x",
    "pkgroll": "^2.x",
    "tsx": "^4.x",
    "typescript": "^5.x"
  }
}
```

**Why this setup?**

- **Native ESM** (`type: "module"` + TS `module: "ESNext"`) for modern imports.
- **`tsx`** for fast dev (TypeScript on the fly + watch).
- **`pkgroll`** to bundle to ESM in `dist/` so Node runs cleanly.
- **`@` aliases** via TS `paths` (no custom loaders needed in dev; bundle resolves them for prod).

---

## `tsconfig.json` (ESM + `@` aliases + global types)

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",

    "rootDir": "./src",
    "outDir": "./dist",

    "baseUrl": "./src",
    "paths": {
      "@app/*": ["app/*"],
      "@domain/*": ["domain/*"],
      "@infra/*": ["infra/*"],
      "@config/*": ["config/*"],
      "@middlewares/*": ["middlewares/*"],
      "@shared/*": ["shared/*"],
      "@utils/*": ["utils/*"],
      "@types/*": ["types/*"]
    },

    "resolveJsonModule": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,

    "typeRoots": ["./node_modules/@types", "./types"]
  },
  "include": ["src", "types"],
  "exclude": ["node_modules", "dist"]
}
```

**Notes**

- `baseUrl` + `paths` enable `@` imports.
- `typeRoots` + `include` make **`/types`** visible for ambient/global `.d.ts`.

---

## ✨ Highlights

- **Native ESM**: `type: "module"` + TS `module: "ESNext"`.
- **DX**: `tsx watch` in dev.
- **Solid build**: `pkgroll` bundles ESM.
- **`@` aliases** via `tsconfig.json`.
- **Hexagonal**: domain decoupled from infra.
- **Logging**: pino + pino-http (pretty in dev, JSON in prod).
- **CORS** via `.env` with local domains separation.

---

## 📦 Requirements

- **Node** ≥ 22.20.0 (LTS)
- **npm** ≥ 11
- Optional local hosts entries:

  ```bash
  127.0.0.1  traefik.localhost app.localhost api.localhost

  ```

---

## 🗂 Tree structure

```
fullstack-backend-core/
├─ src/
│  ├─ app/
│  │  └─ use-cases/
│  ├─ domain/
│  │  ├─ entities/
│  │  └─ ports/
│  ├─ infra/
│  │  └─ http/
│  │     └─ server.ts
│  ├─ config/
│  │  └─ env.ts
│  ├─ shared/
│  │  └─ logger.ts
│  └─ index.ts
└─ types/
   └─ global.d.ts

```

---

## ⚙️ Quick setup

### Create everything in seconds

```bash
# Create structure + base files + .env.example
mkdir -p \
  src/app/use-cases \
  src/domain/entities \
  src/domain/ports \
  src/infra/http \
  src/config \
  src/shared \
  types

# .env.example
cat > .env.example <<'ENV'
# ─────────────────────────────────────────────
# Local domains (separate cookies/CORS)
# ─────────────────────────────────────────────
TRAEFIK_DOMAIN=traefik.localhost
FRONTEND_DOMAIN=app.localhost
BACKEND_DOMAIN=api.localhost

# ─────────────────────────────────────────────
# Runtime
# ─────────────────────────────────────────────
# development | test | production
NODE_ENV=development
PORT=8000
LOG_LEVEL=debug  # fatal|error|warn|info|debug|trace|silent

# ─────────────────────────────────────────────
# CORS
# ─────────────────────────────────────────────
# Option A (recommended): leave empty to allow http://app.localhost:3000
# CORS_ORIGIN=
# Option B: comma-separated list
# CORS_ORIGIN=http://app.localhost:3000,http://another.local

# ─────────────────────────────────────────────
# Service identity (logs/monitoring)
# ─────────────────────────────────────────────
SERVICE_NAME=core
ENV

# src/config/env.ts
cat > src/config/env.ts <<'TS'
import "dotenv/config";
import { z } from "zod";

const Env = z.object({
  NODE_ENV: z.enum(["development","test","production"]).default("development"),
  PORT: z.coerce.number().default(8000),
  LOG_LEVEL: z.enum(["fatal","error","warn","info","debug","trace","silent"]).default("debug"),
  SERVICE_NAME: z.string().default("core"),
  TRAEFIK_DOMAIN: z.string(),
  FRONTEND_DOMAIN: z.string(),
  BACKEND_DOMAIN: z.string(),
  CORS_ORIGIN: z.string().optional()
});

export const env = Env.parse(process.env);

export function getCorsOrigin(): true | string[] {
  if (env.CORS_ORIGIN?.trim()) {
    return env.CORS_ORIGIN.split(",").map(s => s.trim()).filter(Boolean);
  }
  return [`http://${env.FRONTEND_DOMAIN}:3000`];
}
TS

# src/shared/logger.ts
cat > src/shared/logger.ts <<'TS'
import pino from "pino";
import { env } from "@config/env";

const isProd = env.NODE_ENV === "production";

export const logger = pino({
  name: env.SERVICE_NAME,
  level: env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: isProd ? { service: env.SERVICE_NAME } : null,
  transport: isProd ? undefined : {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      singleLine: false,
      ignore: "pid,hostname"
    }
  }
});

export default logger;
TS

# src/infra/http/server.ts
cat > src/infra/http/server.ts <<'TS'
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import { env, getCorsOrigin } from "@config/env";
import logger from "@shared/logger";

const IGNORE = new Set<string>([
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/apple-touch-icon-precomposed.png"
]);

export function buildServer() {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors({ origin: getCorsOrigin(), credentials: true }));
  app.use(cookieParser());
  app.use(express.json());

  app.use(pinoHttp({
    logger,
    redact: { paths: ["req.headers.cookie"], censor: "[redacted]" },
    autoLogging: { ignore: (req) => IGNORE.has(req.url ?? req.originalUrl ?? "") },
    serializers: {
      req: (req) => ({ method: req.method, url: req.url }),
      res: (res) => ({ statusCode: res.statusCode })
    }
  }));

  app.get("/health", (_req, res) => res.json({ ok: true, service: env.SERVICE_NAME }));

  return app;
}

export async function start() {
  const app = buildServer();
  app.listen(env.PORT, () =>
    logger.info({ port: env.PORT, host: env.BACKEND_DOMAIN }, "HTTP server up")
  );
}
TS

# src/index.ts
cat > src/index.ts <<'TS'
import { start } from "@infra/http/server";
start();
TS

# types/global.d.ts
cat > types/global.d.ts <<'TS'
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "test" | "production";
    PORT?: string;
    LOG_LEVEL?: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
    SERVICE_NAME?: string;
    TRAEFIK_DOMAIN?: string;
    FRONTEND_DOMAIN?: string;
    BACKEND_DOMAIN?: string;
    CORS_ORIGIN?: string;
  }
}
TS

echo "✅ Structure created. Copy .env.example to .env and adjust values."

```

---

## 🚀 Usage (run this command in the root of the core repository)

```bash
# Development (watch + pretty logs)
npm run dev

# Build (ESM bundle)
npm run build

# Production (JSON logs)
npm start

```

Health check:

```bash
curl -i http://api.localhost:8000/health

```

---

## 🧱 Design rationale (short)

- **ESM + Node 22** for modern imports without extra runtime layers.
- **`@` aliases** improve readability and keep domain/infra separate; the bundle resolves them.
- **`tsx`** for fast dev; **`pkgroll`** for clean ESM output.
- **Hexagonal**: `domain` (rules/ports) isolated from `infra` (Express, DB adapters, etc.).

---

## 🧪 Logging

- **Dev**: `pino-pretty` with readable timestamps; no `pid/hostname` noise.
- **Prod**: structured JSON (log aggregation friendly).
- **pino-http**: request logging with cookies redacted and noisy icon routes ignored.

---

## 🧭 Base routes

- `GET /health` → `{ ok: true, service: "core" }`

Add `/ready` (readiness) and `notFound`/`errorHandler` when you start adding use cases.

---

## 🧰 Troubleshooting

- `@aliases` not resolved in dev → check `baseUrl/paths` and restart TS server in your editor.
- No logs for `/health` → maybe it’s ignored in `autoLogging`; remove it from the ignore list.
- Seeing cookies from another app → use `app.localhost` vs `api.localhost` domains (already supported) and redaction (enabled).
- CORS blocked → set `CORS_ORIGIN` or adjust `FRONTEND_DOMAIN`.

---

## 📜 License

MIT © 2025 — Felix Figueroa @ Leonobitech

---

## ✨ Maintained by

<p align="center"><strong>🥷 Leonobitech Dev Team</strong><br/> <a href="https://www.leonobitech.com" target="_blank">https://www.leonobitech.com</a><br/> Made with 🧠, 🥷, and Docker love 🐳</p>

---

### 🏷️ Tags

`backend`, `nodejs`, `typescript`, `esm`, `express`, `hexagonal-architecture`, `ports-and-adapters`, `clean-architecture`, `ddd`, `rest-api`, `cors`, `logging`, `pino`, `dotenv`, `tsx`, `pkgroll`, `scalable`, `production-ready`

---

🔥 **This isn’t just an environment. It’s your sandbox, your testing ground, your launchpad. Clone it, break it, build on it — and ship like a hacker.**
