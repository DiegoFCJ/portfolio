import { LanguageMap } from '../models/language.types';

export type ProjectsLangs = LanguageMap<ProjectFull>;

export interface ProjectFull {
    title: string;
    button: string;
    moreDesc: string;
    lessDesc: string;
    projects: Project[];
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    status: string;
    image: string;
    link: string;
    expanded: boolean;
}