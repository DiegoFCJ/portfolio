import { LanguageCode } from '../models/language-code.type';

export type HeroFullLangs = Partial<Record<LanguageCode, HeroFull>>;

export interface HeroFull {
    button: string;
    description: string;
    texts: string[];
}
