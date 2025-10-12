import { LanguageCode } from '../models/language-code.type';

export interface CookieBannerContent {
  title: string;
  message: string;
  policyLabel: string;
  policyRoute: string;
  acceptLabel: string;
  declineLabel: string;
}

export type CookieBannerLangs = Partial<Record<LanguageCode, CookieBannerContent>>;
