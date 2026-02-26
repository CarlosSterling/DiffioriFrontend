import { Metadata, ResolvingMetadata } from 'next'
import { getProducts } from '@/lib/api'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    props: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await props.params;
    const id = params.id
    const products = await getProducts()
    const product = products.find((p: any) => p.slug === id || String(p.id) === id)

    if (!product) return { title: 'Not Found' }

    return {
        title: `${product.name} | Diffiori Cafe`,
        description: product.short_desc || product.description?.substring(0, 150),
        openGraph: {
            title: product.name,
            description: product.short_desc,
            images: product.cover ? [product.cover] : [],
            type: 'website',
        },
    }
}

export default async function ProductPage(props: Props) {
    const params = await props.params;
    const id = params.id
    const products = await getProducts()
    const product = products.find((p: any) => p.slug === id || String(p.id) === id)

    if (!product) {
        notFound()
    }

    // Schema.org JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.cover ? [product.cover] : undefined,
        description: product.short_desc || product.description,
        sku: String(product.id),
        offers: {
            '@type': 'Offer',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/productos/${id}`,
            priceCurrency: 'COP',
            price: product.price,
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
        },
    }

    return (
        <section className="min-h-screen pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Mock Product Details View for SEO indexing */}
                <div className="bg-default-100 rounded-2xl overflow-hidden aspect-square">
                    <img
                        src={product.cover || "/placeholder-coffee.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
                    <p className="text-2xl font-bold text-primary-900">${parseFloat(product.price).toLocaleString('es-CO')}</p>
                    <p className="text-lg text-default-600 leading-relaxed">{product.description || product.short_desc}</p>
                </div>
            </div>
        </section>
    )
}
