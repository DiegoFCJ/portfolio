import { LanguageCode } from '../models/language-code.type';

export interface SkillFull {
    title: string;
    skills: SkillSection[];
}

export interface SkillSection {
    title: string;
    subtitle?: string;
    skills: SkillItem[];
}

export interface SkillItem {
    name: string;
    icon: string;
    clicked: boolean;
}

export type SkillFullLangs = Partial<Record<LanguageCode, SkillFull>>;

