const IS_CLIENT = typeof window !== "undefined";
export const API_URL = IS_CLIENT 
  ? (process.env.NEXT_PUBLIC_API_URL || "/api") 
  : (process.env.INTERNAL_API_URL || "http://api-diffiori:8000/api");

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/productos/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/productos/categories/`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchClients() {
  try {
    const res = await fetch(`${API_URL}/clientes/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch clients");
    return res.json();
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

export async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/posts/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function fetchFaqs() {
  try {
    const res = await fetch(`${API_URL}/faqs/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch faqs");
    return res.json();
  } catch (error) {
    console.error("Error fetching faqs:", error);
    return [];
  }
}

/* ───── HOME CONTENT ───── */

export async function fetchHeroSlides() {
  try {
    const res = await fetch(`${API_URL}/content/hero/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch hero slides");
    return res.json();
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

export async function fetchHomeAbout() {
  try {
    const res = await fetch(`${API_URL}/content/about/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch home about");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : (data.results ? data.results[0] : data);
  } catch (error) {
    console.error("Error fetching home about:", error);
    return null;
  }
}

export async function fetchHomeFeatures() {
  try {
    const res = await fetch(`${API_URL}/content/features/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch features");
    return res.json();
  } catch (error) {
    console.error("Error fetching features:", error);
    return [];
  }
}

export async function fetchHomeCTA() {
  try {
    const res = await fetch(`${API_URL}/content/cta/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch home cta");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : (data.results ? data.results[0] : data);
  } catch (error) {
    console.error("Error fetching home cta:", error);
    return null;
  }
}
