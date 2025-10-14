import { LanguageCode } from '../models/language-code.type';

export type ExperienceFullLangs = Partial<Record<LanguageCode, ExperienceFull>>;

export interface ExperienceFull {
    title: string;
    experiences: Experience[];
}

export interface Experience {
    position: string;
    company?: string;
    location: string;
    startDate: string;
    endDate: string;
    technologies?: string;
    responsibilities?: string;
    responsibilityList?: string[];
}

