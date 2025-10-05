import { LanguageMap } from '../models/language.types';

export type EducationFullLangs = LanguageMap<EducationFull>;

export interface EducationFull {
    title: string;
    education: Education[];
}

export interface Education {
    title: string;
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
}