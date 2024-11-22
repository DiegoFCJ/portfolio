export interface AboutMeLangs {
    en: AboutMe;
    it: AboutMe;
    [key: string]: AboutMe;
}

export interface AboutMe {
    title: string;
    description: string;
}