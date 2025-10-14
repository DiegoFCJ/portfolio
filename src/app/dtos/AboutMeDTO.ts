import { LanguageCode } from '../models/language-code.type';

export type AboutMeLangs = Partial<Record<LanguageCode, AboutMe>>;

export interface AboutMe {
    title: string;
    paragraphs: string[];
    highlightsTitle: string;
    highlights: string[];
}
