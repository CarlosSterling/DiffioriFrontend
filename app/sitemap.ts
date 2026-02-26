import type { MetadataRoute } from 'next'
import { getProducts, fetchPosts, getCategories } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://diffioricafe.com'

    // Fetch all necessary data
    const products = await getProducts() || []
    const categories = await getCategories() || []
    const posts = await fetchPosts() || []

    // Static routes
    const routes = [
        '',
        '/about',
        '/productos',
        '/blog',
        '/contact',
        '/pricing',
        '/faqs',
        '/carta'
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const productRoutes = products.map((product: any) => ({
        url: `${siteUrl}/productos/${product.slug || product.id}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    const categoryRoutes = categories.map((cat: any) => ({
        url: `${siteUrl}/productos/categoria/${cat.slug || cat.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const postRoutes = posts.map((post: any) => ({
        url: `${siteUrl}/blog/${post.slug || post.id}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...routes, ...productRoutes, ...categoryRoutes, ...postRoutes]
}
