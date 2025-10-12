import { LanguageCode } from '../models/language-code.type';

export interface LegalSection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface LegalPageContent {
  title: string;
  updatedOn: string;
  intro?: string;
  sections: LegalSection[];
}

export type LegalPageTranslations = Partial<Record<LanguageCode, LegalPageContent>>;

