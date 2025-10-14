import { LanguageCode } from '../models/language-code.type';

export type EducationFullLangs = Partial<Record<LanguageCode, EducationFull>>;

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
