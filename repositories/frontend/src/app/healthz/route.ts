// src/app/healthz/route.ts  (o src/app/api/healthz/route.ts si preferís /api/healthz)
export function GET() {
  return new Response("ok", {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
