export interface ExperienceFullLangs {
    en: ExperienceFull;
    it: ExperienceFull;
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
    company?: string;
    location: string;
    startDate: string;
    endDate: string;
    /**
     * Optional machine-readable start date used for calculations.
     * Should be an ISO-8601 string (e.g., 2024-04-01).
     */
    startDateValue?: string;
    /**
     * Optional machine-readable end date used for calculations.
     * Should be an ISO-8601 string (e.g., 2025-06-01).
     */
    endDateValue?: string;
    technologies?: string;
    responsibilities?: string;
    responsibilityList?: string[];
}
