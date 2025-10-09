import pino from "pino";
import { env } from "@config/env";

const isProd = env.NODE_ENV === "production";

export const logger = pino({
  name: env.SERVICE_NAME,
  level: env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: isProd ? { service: env.SERVICE_NAME } : null,
  transport: isProd
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          singleLine: false,
          ignore: "pid,hostname",
        },
      },
});

export default logger; // ← también default para evitar líos de import
