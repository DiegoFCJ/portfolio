export interface SkillLangs {
    en: SkillFull;
    it?: SkillFull;
    de?: SkillFull;
    es?: SkillFull;
    [key: string]: SkillFull | undefined;
}

export interface SkillFull {
    title: string;
    skills: SkillSection[];
}

export interface SkillSection {
    title: string;
    skills: SkillItem[];
}

export interface SkillItem {
    name: string;
    icon: string;
    clicked: boolean;
}

