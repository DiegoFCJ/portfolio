export interface ProjectsLangs {
    en: ProjectFull;
    it: ProjectFull;
    de?: ProjectFull;
    es?: ProjectFull;
    [key: string]: ProjectFull | undefined;
}

export interface ProjectFull {
    title: string;
    button: string;
    toggle: {
        expand: string;
        collapse: string;
    };
    navigation: {
        previous: string;
        next: string;
    };
    statusLegend: ProjectStatusLegend;
    projects: Project[];
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    status: ProjectStatus;
    image: string;
    link: string;
    isScrollable?: boolean;
    isAtEnd?: boolean;
}

export type ProjectStatusLevel = 'active' | 'publicBeta' | 'inDevelopment';

export type ProjectStatusTag = 'openSource' | 'release2024';

export interface ProjectStatus {
    level: ProjectStatusLevel;
    tags?: ProjectStatusTag[];
}

export interface ProjectStatusLegend {
    prefix: string;
    levels: Record<ProjectStatusLevel, string>;
    tags: Record<ProjectStatusTag, string>;
}
