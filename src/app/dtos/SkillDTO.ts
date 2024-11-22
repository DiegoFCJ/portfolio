export interface SkillFull {
    title: SkillTitle;
    skills: Skill[];
}

export interface Skill {
    title: SkillTitle;
    skills: SkillItem[];
}

interface SkillTitle {
    en: string;
    it: string;
}


interface SkillItem {
    name: string; 
    icon: string, 
    clicked: boolean 
}

