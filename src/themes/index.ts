import { cyberpunkTheme } from './cyberpunk';
import { minimalModernTheme } from './minimal-modern';
import { retroWaveTheme } from './retrowave';

export const THEMES = {
  cyberpunk: cyberpunkTheme,
  'minimal-modern': minimalModernTheme,
  retrowave: retroWaveTheme,
};

export type ThemeName = keyof typeof THEMES;

export function getTheme(name: ThemeName = 'cyberpunk') {
  return THEMES[name];
}

export function getAllThemeNames(): ThemeName[] {
  return Object.keys(THEMES) as ThemeName[];
}

export function isValidTheme(theme: string): theme is ThemeName {
  return Object.keys(THEMES).includes(theme);
}
