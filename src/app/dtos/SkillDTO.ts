import { LanguageMap } from '../models/language.types';

export interface SkillFull {
    title: LanguageMap<string>;
    skills: Skill[];
}

export interface Skill {
    title: LanguageMap<string>;
    skills: SkillItem[];
}

export interface SkillItem {
    name: string;
    icon: string;
    clicked: boolean;
}

