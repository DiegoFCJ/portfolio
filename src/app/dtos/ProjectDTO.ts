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
    image: string;
    link: string;
    expanded: boolean;
}