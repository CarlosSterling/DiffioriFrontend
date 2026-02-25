import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vivatech.com.co";

// pide al backend las listas de slug para generar <url>
async function fetchSlugs(apiPath: string): Promise<string[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${apiPath}/?is_active=true`, {
    next: { revalidate: 60 * 60 * 24 },  // 1 día
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: { slug: string }) => item.slug);
}

export async function GET(_req: NextRequest) {
  /* 1. Rutas estáticas */
  const staticPages = ["", "productos", "blog", "faqs", "clients"].map(
    (path) => `${BASE_URL}/${path}`
  );

  /* 2. Rutas dinámicas desde la API */
  const [productSlugs, postSlugs, clientSlugs] = await Promise.all([
    fetchSlugs("productos"),
    fetchSlugs("posts"),
    fetchSlugs("clientes"),
  ]);

  const urls: string[] = [
    ...staticPages,
    ...productSlugs.map((s) => `${BASE_URL}/productos/${s}`),
    ...postSlugs.map((s) => `${BASE_URL}/blog/${s}`),
    ...clientSlugs.map((s) => `${BASE_URL}/clients/${s}`),
  ];

  /* 3. Construir XML */
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (url) => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
  </url>`
      )
      .join("") +
    `\n</urlset>`;

  return new NextResponse(body.trim(), {
    headers: { "Content-Type": "application/xml" },
  });
}
