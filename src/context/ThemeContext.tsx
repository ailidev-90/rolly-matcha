"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { ThemeId, ThemeConfig } from "../themes/types";
import { getTheme } from "../themes";

interface ThemeContextType {
  currentTheme: ThemeId;
  setTheme: (themeId: ThemeId) => void;
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>("matcha");
  const [theme, setThemeConfig] = useState<ThemeConfig>(getTheme("matcha"));

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("rolly-theme") as ThemeId;
    if (savedTheme && (savedTheme === "matcha" || savedTheme === "default")) {
      setCurrentTheme(savedTheme);
      setThemeConfig(getTheme(savedTheme));
    }
  }, []);

  const setTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId);
    setThemeConfig(getTheme(themeId));
    localStorage.setItem("rolly-theme", themeId);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
