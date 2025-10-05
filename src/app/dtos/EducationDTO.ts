export interface EducationFullLangs {
    en: EducationFull;
    it?: EducationFull;
    de?: EducationFull;
    es?: EducationFull;
    [key: string]: EducationFull | undefined;
}

export interface EducationFull {
    title: string;
    education: Education[];
}

export interface Education {
    title: string;
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
}