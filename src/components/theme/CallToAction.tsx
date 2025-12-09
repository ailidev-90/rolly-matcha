"use client";

import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 my-16">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-green-600 opacity-10 blur-3xl"></div>
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-green-500 opacity-10 blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400 backdrop-blur-sm">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Limited Time Offer
            </div>

            {/* Headline */}
            <h2
              className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Start Your Matcha Journey Today
            </h2>

            {/* Description */}
            <p className="mb-8 text-lg leading-relaxed text-gray-300">
              Join thousands of satisfied customers who have transformed their daily routine with our premium matcha.
              Get <span className="font-bold text-green-400">30% off</span> your first order.
            </p>

            {/* Benefits List */}
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Premium Quality Guaranteed</p>
                  <p className="text-sm text-gray-400">Sourced directly from Japanese tea gardens</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">Free Shipping Worldwide</p>
                  <p className="text-sm text-gray-400">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-white">30-Day Money Back</p>
                  <p className="text-sm text-gray-400">100% satisfaction guaranteed</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                  borderRadius: "9999px",
                }}
              >
                Shop Now
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                View Collection
              </Link>
            </div>
          </div>

          {/* Right Content - Stats & Social Proof */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                <div className="mb-2 text-4xl font-bold text-white">2,000+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                <div className="mb-2 text-4xl font-bold text-white">4.9★</div>
                <div className="text-sm text-gray-400">Average Rating</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                <div className="mb-2 text-4xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Organic</div>
              </div>
              <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
                <div className="mb-2 text-4xl font-bold text-white">30%</div>
                <div className="text-sm text-gray-400">First Order Discount</div>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
              <div className="mb-4 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-gray-300 italic">
                "The best matcha I've ever tasted! The quality is exceptional and the energy boost is amazing. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
                <div>
                  <p className="font-semibold text-white">Sarah Johnson</p>
                  <p className="text-sm text-gray-400">Verified Customer</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10">
              <div className="text-center">
                <svg className="mx-auto mb-1 h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs text-gray-400">Secure</p>
              </div>
              <div className="text-center">
                <svg className="mx-auto mb-1 h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <p className="text-xs text-gray-400">Free Ship</p>
              </div>
              <div className="text-center">
                <svg className="mx-auto mb-1 h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <p className="text-xs text-gray-400">Easy Return</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
