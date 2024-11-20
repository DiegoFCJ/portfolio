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