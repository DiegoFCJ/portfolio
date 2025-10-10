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
    linksLegend: ProjectLinksLegend;
    projects: Project[];
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    status: ProjectStatus;
    image: string;
    links?: ProjectLinks;
    isScrollable?: boolean;
    isAtEnd?: boolean;
}

export interface ProjectLinks {
    code?: ProjectLinkDetail;
    site?: ProjectLinkDetail;
    demo?: ProjectLinkDetail;
}

export interface ProjectLinkDetail {
    state: ProjectLinkState;
    url?: string;
}

export type ProjectLinkState = 'available' | 'private' | 'unavailable';

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

export interface ProjectLinksLegend {
    code: ProjectCodeLinkLegend;
    preview: ProjectPreviewLinkLegend;
}

export interface ProjectCodeLinkLegend {
    availableLabel: string;
    privateLabel: string;
    unavailableLabel: string;
}

export interface ProjectPreviewLinkLegend {
    siteLabel: string;
    demoLabel: string;
    unavailableLabel: string;
}
