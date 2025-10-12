import { LanguageCode } from '../models/language-code.type';

export interface CookieBannerContent {
  heading: string;
  message: string;
  policyLinkLabel: string;
  acceptLabel: string;
  rejectLabel: string;
}

export type CookieBannerTranslations = Partial<Record<LanguageCode, CookieBannerContent>>;

