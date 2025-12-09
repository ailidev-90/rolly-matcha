"use client";

import Image from "next/image";
import Link from "next/link";

type HeroBannerProps = {
  businessName?: string | null;
  businessImage?: string | null;
  businessDescription?: string | null;
};

export function HeroBanner({
  businessName,
  businessImage,
  businessDescription,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-green-200 opacity-20 blur-3xl"></div>
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-green-300 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Premium Quality Matcha
            </div>

            {/* Headline */}
            <h1
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Daily Dose of{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Matcha Happiness
              </span>
            </h1>

            {/* Description */}
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Experience the authentic taste of premium Japanese matcha. Handpicked from the finest tea gardens,
              stone-ground to perfection for maximum flavor and health benefits.
            </p>

            {/* Features */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">100% Organic</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">Rich in Antioxidants</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">Energy Boost</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">Free Shipping</span>
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
                className="inline-flex items-center gap-2 rounded-full border-2 border-green-600 bg-white px-8 py-4 text-base font-semibold text-green-600 transition-all hover:bg-green-50"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center gap-6 border-t pt-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-green-600"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-green-500 to-green-700"></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-green-600 to-green-800"></div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-medium text-gray-700">2,000+ Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Floating Badge */}
            <div className="absolute -right-4 top-8 z-10 animate-bounce rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
              30% OFF
            </div>

            {/* Main Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-green-100 to-green-50 p-8 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,179,66,0.1),rgba(255,255,255,0))]"></div>

              {/* Placeholder for product image - you can replace with actual image */}
              <div className="relative flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 text-8xl">🍵</div>
                  <p className="text-2xl font-bold text-green-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Premium Matcha
                  </p>
                  <p className="mt-2 text-green-600">Ceremonial Grade</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute left-4 top-1/4 animate-pulse rounded-full bg-white p-3 shadow-lg">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute bottom-1/4 right-4 animate-pulse rounded-full bg-white p-3 shadow-lg" style={{ animationDelay: "0.5s" }}>
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-white p-4 text-center shadow-md">
                <p className="text-2xl font-bold text-green-600">100%</p>
                <p className="text-xs text-gray-600">Organic</p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-md">
                <p className="text-2xl font-bold text-green-600">5★</p>
                <p className="text-xs text-gray-600">Rated</p>
              </div>
              <div className="rounded-xl bg-white p-4 text-center shadow-md">
                <p className="text-2xl font-bold text-green-600">2K+</p>
                <p className="text-xs text-gray-600">Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
