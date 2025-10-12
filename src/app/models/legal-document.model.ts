import { LanguageCode } from './language-code.type';

export interface LegalDocumentSubSection {
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalDocumentSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  subSections?: LegalDocumentSubSection[];
}

export interface LegalDocumentContent {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalDocumentSection[];
}

export type LegalDocumentMap = Partial<Record<LanguageCode, LegalDocumentContent>>;
