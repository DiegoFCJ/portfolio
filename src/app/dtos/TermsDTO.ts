import { LanguageCode } from '../models/language-code.type';

export interface TermsSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface TermsContent {
  pageTitle: string;
  lastUpdatedLabel: string;
  lastUpdatedDate: string;
  intro: string[];
  sections: TermsSection[];
  contactTitle: string;
  contactParagraphs: string[];
  contactEmailLabel: string;
  contactEmail: string;
}

export type TermsLangs = Partial<Record<LanguageCode, TermsContent>>;
