import type { ThemeConfig } from "./types";

export const matchaTheme: ThemeConfig = {
  id: "matcha",
  name: "Matcha Paradise",
  description: "A fresh, calming theme inspired by Japanese matcha tea culture",
  colors: {
    // Hero Section - Soft matcha green with warm accents
    heroBg: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
    heroText: "#2E5339",
    heroAccent: "#66BB6A",
    heroButton: "#4CAF50",
    heroButtonHover: "#388E3C",
    heroButtonText: "#FFFFFF",

    // General
    background: "#F1F8F4",
    cardBg: "#FFFFFF",
    cardBorder: "#D4E9D7",
    
    // Text
    textPrimary: "#1B3A2F",
    textSecondary: "#5A7A6A",
    textAccent: "#4CAF50",
    
    // Product
    productBadgeBg: "#E8F5E9",
    productBadgeText: "#2E7D32",
    productImageBg: "#F9FDF9",
    
    // Buttons
    primaryButton: "#4CAF50",
    primaryButtonHover: "#388E3C",
    primaryButtonText: "#FFFFFF",
    secondaryButton: "#E8F5E9",
    secondaryButtonHover: "#C8E6C9",
    secondaryButtonText: "#2E7D32",
    
    // Header
    headerBg: "#E8F5E9",
    headerText: "#1B3A2F",
    
    // Footer
    footerBg: "#2E5339",
    footerText: "#E8F5E9",
    
    // CTA Section
    ctaBg: "#C8E6C9",
    ctaText: "#1B3A2F",
    ctaButton: "#4CAF50",
    ctaButtonHover: "#388E3C",
    ctaButtonText: "#FFFFFF",
  },
  fonts: {
    heading: "font-semibold",
    body: "font-normal",
  },
  borderRadius: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
};
