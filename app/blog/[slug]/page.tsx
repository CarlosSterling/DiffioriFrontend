import { Metadata, ResolvingMetadata } from 'next'
import { fetchPosts } from '@/lib/api'
import { notFound } from 'next/navigation'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    props: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const params = await props.params;
    const slug = params.slug
    const posts = await fetchPosts()
    const post = posts.find((p: any) => p.slug === slug || String(p.id) === slug)

    if (!post) return { title: 'Not Found' }

    return {
        title: `${post.title} | Blog Diffiori`,
        description: post.excerpt || `${post.title} en el blog de café especial.`,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.cover ? [post.cover] : [],
            type: 'article',
            publishedTime: post.created_at,
        },
    }
}

export default async function BlogPostPage(props: Props) {
    const params = await props.params;
    const slug = params.slug
    const posts = await fetchPosts()
    const post = posts.find((p: any) => p.slug === slug || String(p.id) === slug)

    if (!post) {
        notFound()
    }

    // Schema.org BlogPosting JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        image: post.cover ? [post.cover] : [],
        datePublished: post.created_at,
        author: {
            '@type': 'Person',
            name: post.author_name || 'Diffiori Cafe'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Diffiori Cafe',
            logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/logoDiffiori.png`
            }
        }
    }

    return (
        <article className="min-h-screen pt-24 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            {post.cover && (
                <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                    <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
                </div>
            )}
            <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
    )
}
