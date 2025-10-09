// src/infra/http/server.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import { env, getCorsOrigin } from "@config/env";
import logger from "@shared/logger";

const IGNORE = new Set<string>([
  //"/health",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/apple-touch-icon-precomposed.png",
]);

export function buildServer() {
  const app = express();

  app.disable("x-powered-by");
  app.use(cors({ origin: getCorsOrigin(), credentials: true }));
  app.use(cookieParser());
  app.use(express.json());

  // ✅ pino-http con autoLogging.ignore (compatible con tipos)
  app.use(
    pinoHttp({
      logger,
      redact: { paths: ["req.headers.cookie"], censor: "[redacted]" },
      autoLogging: {
        ignore: (req) => IGNORE.has(req.url ?? req.originalUrl ?? ""),
      },
      serializers: {
        req: (req) => ({ method: req.method, url: req.url }),
        res: (res) => ({ statusCode: res.statusCode }),
      },
    })
  );

  app.get("/health", (_req, res) =>
    res.json({ ok: true, service: env.SERVICE_NAME })
  );

  return app;
}

export async function start() {
  const app = buildServer();
  app.listen(env.PORT, () =>
    logger.info({ port: env.PORT, host: env.BACKEND_DOMAIN }, "HTTP server up")
  );
}
