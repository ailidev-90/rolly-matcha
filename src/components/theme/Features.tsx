"use client";

import { useTheme } from "../../context/ThemeContext";

export function Features() {
    const { theme } = useTheme();

    const features = [
        {
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
            ),
            title: "Free Shipping",
            description: "Free delivery on all orders over $50. Fast and reliable shipping worldwide.",
        },
        {
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Secure Payment",
            description: "Your payment information is processed securely with industry-standard encryption.",
        },
        {
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            title: "Easy Returns",
            description: "Not satisfied? Return within 30 days for a full refund. No questions asked.",
        },
        {
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: "24/7 Support",
            description: "Our customer service team is always available to help you with any questions.",
        },
    ];

    return (
        <section className="py-16 bg-gray-50 rounded-3xl my-16">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2
                        className="text-3xl sm:text-4xl font-bold mb-4"
                        style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.textPrimary || "#1a1a1a" }}
                    >
                        Why Shop With Us
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: theme.colors.textSecondary || "#6b7280" }}
                    >
                        We're committed to providing you with the best shopping experience
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                                style={{
                                    background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                                    color: "#ffffff",
                                }}
                            >
                                {feature.icon}
                            </div>
                            <h3
                                className="text-lg font-bold mb-2"
                                style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                            >
                                {feature.title}
                            </h3>
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: theme.colors.textSecondary || "#6b7280" }}
                            >
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
