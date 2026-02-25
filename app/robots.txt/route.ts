import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";          // opcional, funciona en node y edge

export async function GET(_req: NextRequest) {
  const lines = [
    "User-Agent: *",
    "Allow: /",
    // bloquea la carpeta admin de Django (cambia si usas dominio distinto)
    "Disallow: /admin/",
    "",
    "Sitemap: https://vivatech.com.co/sitemap.xml",
  ].join("\n");

  return new NextResponse(lines, {
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
  });
}
