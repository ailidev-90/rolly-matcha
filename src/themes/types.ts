export type ThemeId = "matcha" | "default";

export interface ThemeColors {
  // Hero Section
  heroBg: string;
  heroText: string;
  heroAccent: string;
  heroButton: string;
  heroButtonHover: string;
  heroButtonText: string;

  // General
  background: string;
  cardBg: string;
  cardBorder: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  
  // Product
  productBadgeBg: string;
  productBadgeText: string;
  productImageBg: string;
  
  // Buttons
  primaryButton: string;
  primaryButtonHover: string;
  primaryButtonText: string;
  secondaryButton: string;
  secondaryButtonHover: string;
  secondaryButtonText: string;
  
  // Header
  headerBg: string;
  headerText: string;
  
  // Footer
  footerBg: string;
  footerText: string;
  
  // CTA Section
  ctaBg: string;
  ctaText: string;
  ctaButton: string;
  ctaButtonHover: string;
  ctaButtonText: string;
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
