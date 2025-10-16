import { Injectable } from '@angular/core';
import {
  AVAILABLE_LANGUAGES,
  AVAILABLE_THEMES,
  NAVIGATOR_LANGUAGE_FLAGS,
  NAVIGATOR_LANGUAGE_NAMES,
  NAVIGATOR_MENU_LABELS,
  NAVIGATOR_PAGE_LINKS,
  NAVIGATOR_THEME_NAMES,
  NAVIGATOR_TOGGLE_BUTTON_LABELS,
  NAVIGATOR_TOOLTIP_FALLBACK_ORDER,
  NAVIGATOR_TOOLTIPS,
  type NavigatorPageLinkDefinition,
  type NavigatorTooltipDictionary,
  type ToggleButtonLabels,
} from '../constants/navigation-dictionary.const';
import { LanguageCode } from '../models/language-code.type';
import { ThemeKey } from '../models/theme-key.type';

@Injectable({ providedIn: 'root' })
export class NavigationDictionaryService {
  getAvailableThemes(): ThemeKey[] {
    return [...AVAILABLE_THEMES];
  }

  getAvailableLanguages(): LanguageCode[] {
    return [...AVAILABLE_LANGUAGES];
  }

  getNavigatorTooltips(): Record<LanguageCode, NavigatorTooltipDictionary> {
    return NAVIGATOR_TOOLTIPS;
  }

  getTooltipFallbackOrder(): LanguageCode[] {
    return [...NAVIGATOR_TOOLTIP_FALLBACK_ORDER];
  }

  getThemeNames(): Record<LanguageCode, Record<ThemeKey, string>> {
    return NAVIGATOR_THEME_NAMES;
  }

  getLanguageNames(): Record<LanguageCode, Record<LanguageCode, string>> {
    return NAVIGATOR_LANGUAGE_NAMES;
  }

  getLanguageFlags(): Record<LanguageCode, string> {
    return NAVIGATOR_LANGUAGE_FLAGS;
  }

  getToggleButtonLabels(): Record<LanguageCode, ToggleButtonLabels> {
    return NAVIGATOR_TOGGLE_BUTTON_LABELS;
  }

  getMenuLabels(): Record<LanguageCode, string> {
    return NAVIGATOR_MENU_LABELS;
  }

  getPageLinks(): NavigatorPageLinkDefinition[] {
    return NAVIGATOR_PAGE_LINKS.map((link) => ({ ...link, labels: { ...link.labels } }));
  }
}
