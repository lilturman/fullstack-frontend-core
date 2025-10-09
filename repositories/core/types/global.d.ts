// Tipos/augmentations globales
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "test" | "production";
    PORT?: string;
    LOG_LEVEL?: "fatal" | "error" | "warn" | "info" | "debug" | "trace" | "silent";
  }
}

// Ejemplo de augmentación Express (descomenta si lo usas):
// declare namespace Express {
//   interface Request {
//     auth?: { userId: string };
//   }
// }
