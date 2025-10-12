import { LanguageCode } from './language-code.type';

export interface LegalContentSection {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly paragraphs?: string[];
  readonly bulletPoints?: string[];
}

export interface LegalPageContent {
  readonly title: string;
  readonly lastUpdatedLabel: string;
  readonly intro: string[];
  readonly sections: LegalContentSection[];
}

export type LegalContentDictionary = Partial<Record<LanguageCode, LegalPageContent>>;
