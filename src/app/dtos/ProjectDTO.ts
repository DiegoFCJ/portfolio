export interface ProjectsLangs {
    en: ProjectFull;
    it?: ProjectFull;
    de?: ProjectFull;
    es?: ProjectFull;
    [key: string]: ProjectFull | undefined;
}

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