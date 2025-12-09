"use client";

import Link from "next/link";
import { useBusinessMetadata } from "../../hooks/useBusinessMetadata";

export default function TermsPage() {
  const { loading, error, metadata } = useBusinessMetadata();

  return (
    <div className="min-h-screen bg-[#F9FBF7] text-[#1F3D2B]">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <header className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-medium text-[#3F6B3F] hover:underline"
          >
            ← Back to menu
          </Link>
          <h1 className="text-lg font-semibold text-[#1F3D2B]">
            Terms & Conditions
          </h1>
        </header>

        {loading && (
          <p className="text-sm text-[#4A6B4A]">Loading terms...</p>
        )}

        {error && !loading && (
          <p className="text-sm text-red-600">Error: {error}</p>
        )}

        {!loading && !error && (
          <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-[#E1E9DA]">
            {metadata?.terms ? (
              <div
                className="prose prose-sm max-w-none text-[#4A6B4A]"
                dangerouslySetInnerHTML={{ __html: metadata.terms }}
              />
            ) : (
              <p className="text-sm text-[#6A826A]">
                Terms & Conditions belum diatur.
              </p>
            )}
          </article>
        )}
      </div>
    </div>
  );
}

