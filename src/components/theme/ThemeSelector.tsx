"use client";

import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import type { ThemeId } from "../../themes/types";

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: ThemeId) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme Options Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            style={{ zIndex: -1 }}
          />
          
          {/* Theme Options */}
          <div className="absolute bottom-16 right-0 mb-2 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5">
            <p className="mb-3 px-2 text-xs font-semibold text-gray-600">
              Select Theme
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleThemeChange("matcha")}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-105 ${
                  currentTheme === "matcha"
                    ? "ring-2 ring-green-500 shadow-md"
                    : "hover:bg-gray-50"
                }`}
                style={{
                  background:
                    currentTheme === "matcha"
                      ? "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)"
                      : "transparent",
                }}
              >
                <span className="text-2xl">🍵</span>
                <span className="text-sm font-medium text-gray-700">
                  Matcha
                </span>
                {currentTheme === "matcha" && (
                  <svg
                    className="ml-auto h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:scale-110 hover:shadow-xl ${
          isOpen ? "scale-110 ring-2 ring-green-500" : ""
        }`}
        title="Change Theme"
      >
        <span className="text-2xl">🎨</span>
      </button>
    </div>
  );
}
