import { LanguageMap } from '../models/language.types';

export type HeroFullLangs = LanguageMap<HeroFull>;

export interface HeroFull {
    button: string;
    description: string;
    texts: string[];
}