export interface SkillFull {
    title: string;
    skills: Skill[];
}

export interface Skill {
    title: string;
    skills: SkillItem[];
}

interface SkillItem {
    name: string; 
    icon: string, 
    clicked: boolean 
}

