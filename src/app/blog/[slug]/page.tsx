import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Tag,
  BadgeCheck,
  Shield,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllSlugs,
} from "@/lib/blog-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://cleartaxsolutions.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

  // JSON-LD Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.owner,
      jobTitle: SITE_CONFIG.credential,
      worksFor: {
        "@type": "TaxPreparationService",
        name: SITE_CONFIG.name,
        url: "https://cleartaxsolutions.com",
      },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: "https://cleartaxsolutions.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cleartaxsolutions.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <>
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ===== ARTICLE HEADER ===== */}
      <section className="gradient-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative section-padding py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-teal-300 text-xs font-semibold rounded-full">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight text-balance">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-navy-200">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-teal-400" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-400" />
                {new Date(post.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-400" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARTICLE BODY ===== */}
      <section className="bg-white">
        <div className="section-padding">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <article className="flex-1 max-w-none lg:max-w-3xl">
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-navy-500 prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-gray-700 prose-li:leading-relaxed
                  prose-ul:my-4 prose-ul:pl-6 prose-ul:list-disc
                  prose-strong:text-navy-600
                  prose-a:text-teal-500 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-teal-600 hover:prose-a:underline
                  prose-em:text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-8 space-y-8">
                {/* Author Card */}
                <div className="card border-2 border-teal-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-navy-50 flex items-center justify-center">
                      <Shield className="w-7 h-7 text-navy-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-500">
                        {SITE_CONFIG.owner}
                      </h3>
                      <p className="text-sm text-teal-500 font-medium">
                        {SITE_CONFIG.credential}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Joseph Gasana is a federally licensed IRS Enrolled Agent
                    (License No. {SITE_CONFIG.licenseNo}) authorized to represent
                    taxpayers before all administrative levels of the IRS in all
                    50 states.
                  </p>
                  <Link
                    href="/about"
                    className="text-teal-500 text-sm font-semibold hover:text-teal-600 transition-colors"
                  >
                    Learn more about Joseph &rarr;
                  </Link>
                </div>

                {/* CTA Card */}
                <div className="bg-navy-500 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Have Questions?
                  </h3>
                  <p className="text-navy-200 text-sm mb-4">
                    Get personalized guidance for your specific tax situation.
                  </p>
                  <Link href="/book" className="btn-primary w-full text-sm">
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== RELATED POSTS ===== */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50">
          <div className="section-padding">
            <div className="text-center mb-10">
              <span className="text-teal-500 font-semibold text-sm uppercase tracking-wider">
                Continue Reading
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-navy-500">
                Related Articles
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((related) => (
                <article key={related.slug} className="card flex flex-col">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">
                      <Tag className="w-3 h-3" />
                      {related.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy-500 leading-snug mb-2">
                    <Link
                      href={`/blog/${related.slug}`}
                      className="hover:text-teal-500 transition-colors"
                    >
                      {related.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {related.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {related.readTime}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center gap-1 text-teal-500 font-semibold text-sm hover:text-teal-600 transition-colors group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BOTTOM CTA ===== */}
      <section className="gradient-navy">
        <div className="section-padding py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Have Questions About Your Tax Situation?
          </h2>
          <p className="mt-3 text-navy-200 max-w-xl mx-auto">
            Every tax situation is unique. Book a free consultation with Joseph
            Gasana, EA, for advice tailored to your specific circumstances.
          </p>
          <div className="mt-6">
            <Link href="/book" className="btn-primary">
              Book a Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
