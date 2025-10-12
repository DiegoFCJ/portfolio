import { LanguageCode } from '../models/language-code.type';

export interface FooterContent {
  legalTitle: string;
  privacyLabel: string;
  termsLabel: string;
  manageCookiesLabel: string;
  revokeCookiesLabel: string;
  copyrightNotice: string;
}

export type FooterTranslations = Partial<Record<LanguageCode, FooterContent>>;

