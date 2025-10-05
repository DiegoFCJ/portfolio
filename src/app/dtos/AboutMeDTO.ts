import { LanguageMap } from '../models/language.types';

export type AboutMeLangs = LanguageMap<AboutMe>;

export interface AboutMe {
    title: string;
    description: string;
}