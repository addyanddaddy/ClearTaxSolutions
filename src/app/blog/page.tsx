import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Tax Tips & Insights Blog",
  description:
    "Expert tax articles by Joseph Gasana, IRS Enrolled Agent. Tax planning strategies, IRS audit guidance, self-employment deductions, and tax debt resolution insights.",
  openGraph: {
    title: "Tax Tips & Insights Blog | Clear Tax Solutions",
    description:
      "Expert tax articles by Joseph Gasana, IRS Enrolled Agent. Tax planning, audit guidance, deductions, and tax debt resolution.",
  },
};

export default function BlogPage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="gradient-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative section-padding py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">
              Clear Tax Solutions Blog
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">
              Tax Tips &amp; Insights
            </h1>
            <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto">
              Expert guidance on tax planning, IRS representation, deductions,
              and tax debt resolution — written by Joseph Gasana, IRS Enrolled
              Agent.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BLOG GRID ===== */}
      <section className="bg-gray-50">
        <div className="section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="card flex flex-col">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-navy-500 leading-snug mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-teal-500 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
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

      {/* ===== CTA SECTION ===== */}
      <section className="bg-white">
        <div className="section-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-500">
            Have a Tax Question?
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            These articles provide general guidance. For advice specific to your
            situation, schedule a free consultation with Joseph Gasana, EA.
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
