import { LanguageCode } from '../models/language-code.type';

export interface FooterContent {
  owner: string;
  privacyLabel: string;
  termsLabel: string;
  cookieSettingsLabel: string;
}

export type FooterLangs = Partial<Record<LanguageCode, FooterContent>>;
