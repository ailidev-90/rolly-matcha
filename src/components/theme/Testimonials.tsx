"use client";

import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export function Testimonials() {
    const { theme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Verified Buyer",
            avatar: "SJ",
            rating: 5,
            text: "Absolutely love my purchase! The quality exceeded my expectations and shipping was super fast. Will definitely be ordering again!",
        },
        {
            name: "Michael Chen",
            role: "Verified Buyer",
            avatar: "MC",
            rating: 5,
            text: "Outstanding customer service and premium products. The attention to detail is remarkable. Highly recommend to anyone looking for quality!",
        },
        {
            name: "Emma Williams",
            role: "Verified Buyer",
            avatar: "EW",
            rating: 5,
            text: "Best online shopping experience I've had! The products are exactly as described and the packaging was beautiful. Five stars!",
        },
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-16 my-16">
            <div className="text-center mb-12">
                <div className="inline-block mb-3 px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                    💬 Customer Reviews
                </div>
                <h2
                    className="text-3xl sm:text-4xl font-bold mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: theme.colors.textPrimary || "#1a1a1a" }}
                >
                    What Our Customers Say
                </h2>
                <p
                    className="text-lg max-w-2xl mx-auto"
                    style={{ color: theme.colors.textSecondary || "#6b7280" }}
                >
                    Don't just take our word for it - hear from our satisfied customers
                </p>
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Testimonial Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 relative overflow-hidden">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 opacity-10">
                        <svg className="h-24 w-24 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-6">
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                <svg
                                    key={i}
                                    className="h-6 w-6 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>

                        {/* Testimonial Text */}
                        <p
                            className="text-xl sm:text-2xl mb-8 leading-relaxed italic"
                            style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                        >
                            "{testimonials[currentIndex].text}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                            <div
                                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                                style={{
                                    background: "linear-gradient(135deg, #7cb342 0%, #558b2f 100%)",
                                }}
                            >
                                {testimonials[currentIndex].avatar}
                            </div>
                            <div>
                                <p
                                    className="font-bold text-lg"
                                    style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                                >
                                    {testimonials[currentIndex].name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {testimonials[currentIndex].role}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={prevTestimonial}
                        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                        aria-label="Previous testimonial"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-[#7cb342]" : "w-2 bg-gray-300"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextTestimonial}
                        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        style={{ color: theme.colors.textPrimary || "#1a1a1a" }}
                        aria-label="Next testimonial"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
