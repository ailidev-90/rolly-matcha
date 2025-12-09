import { matchaTheme } from "./matcha";
import type { ThemeConfig, ThemeId } from "./types";

export const themes: Record<ThemeId, ThemeConfig> = {
  matcha: matchaTheme,
  default: matchaTheme, // For now, default to matcha
};

export const getTheme = (themeId: ThemeId): ThemeConfig => {
  return themes[themeId] || themes.matcha;
};

export * from "./types";
export { matchaTheme };
