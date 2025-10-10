import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="max-w-xl mx-auto grid gap-4">
      <h1 className="text-2xl font-semibold">🚀 Frontend Core — Hello World</h1>
      <Card>
        <CardHeader>
          <CardTitle>Stack</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Next.js 15 + TypeScript + Tailwind + Turbopack + shadcn/ui</p>
          <Button>It works</Button>
        </CardContent>
      </Card>
    </main>
  );
}
