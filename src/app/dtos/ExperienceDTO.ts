export interface ExperienceFullLangs {
    en: ExperienceFull;
    it?: ExperienceFull;
    de?: ExperienceFull;
    es?: ExperienceFull;
    [key: string]: ExperienceFull | undefined;
}

export interface ExperienceFull {
    title: string;
    experiences: Experience[];
}

export interface Experience {
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    technologies?: string;
    responsibilities: string;
}
