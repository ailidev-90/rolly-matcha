"use client";

import Link from "next/link";
import { useTheme } from "../../context/ThemeContext";

export function ThemedFooter() {
  const { theme } = useTheme();

  return (
    <footer
      id="contact"
      className="mt-20 relative"
      style={{
        backgroundColor: theme.colors.footerBg || "#1a1a1a",
      }}
    >
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3
              className="mb-4 text-2xl font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: theme.colors.footerText || "#ffffff",
              }}
            >
              Rolly Store
            </h3>
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
            >
              Your trusted destination for premium quality products. We're committed to providing exceptional service and curated selections that enhance your lifestyle.
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110"
                style={{ color: theme.colors.footerText || "#ffffff" }}
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110"
                style={{ color: theme.colors.footerText || "#ffffff" }}
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110"
                style={{ color: theme.colors.footerText || "#ffffff" }}
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-110"
                style={{ color: theme.colors.footerText || "#ffffff" }}
                aria-label="Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ color: theme.colors.footerText || "#ffffff" }}
            >
              Shop
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  All Products
                </Link>
              </li>
              <li>
                <a
                  href="/#featured"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Featured Items
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="/#"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Best Sellers
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ color: theme.colors.footerText || "#ffffff" }}
            >
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#contact"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4
              className="mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ color: theme.colors.footerText || "#ffffff" }}
            >
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-opacity hover:opacity-70"
                  style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t pt-12" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
          <div className="max-w-md">
            <h4
              className="mb-3 text-lg font-bold"
              style={{ color: theme.colors.footerText || "#ffffff" }}
            >
              Stay in the loop
            </h4>
            <p
              className="mb-4 text-sm"
              style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.8 }}
            >
              Subscribe to our newsletter for exclusive offers, new arrivals, and more.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border-2 border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-white/50 focus:border-white/40 focus:bg-white/20"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <div className="container-custom">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="text-sm"
              style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.6 }}
            >
              © {new Date().getFullYear()} Rolly Store. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs"
                style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.6 }}
              >
                We accept:
              </span>
              <div className="flex gap-2">
                {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                  <div
                    key={method}
                    className="flex h-8 items-center justify-center rounded bg-white px-3"
                  >
                    <span className="text-xs font-semibold text-gray-700">{method}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p
            className="mt-4 text-center text-xs"
            style={{ color: theme.colors.footerText || "#ffffff", opacity: 0.5 }}
          >
            Powered by Rolly E-Commerce Platform
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-8 -top-6 flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
          color: "#ffffff",
        }}
        aria-label="Back to top"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
}
