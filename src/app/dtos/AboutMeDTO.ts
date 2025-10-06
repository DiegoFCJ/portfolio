export interface AboutMeLangs {
    en: AboutMe;
    it?: AboutMe;
    de?: AboutMe;
    es?: AboutMe;
    [key: string]: AboutMe | undefined;
}

export interface AboutMe {
    title: string;
    description: string;
}