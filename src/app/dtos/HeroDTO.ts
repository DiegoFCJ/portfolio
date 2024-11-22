export interface HeroFullLangs {
    en: HeroFull;
    it: HeroFull;
    [key: string]: HeroFull;
}

export interface HeroFull {
    button: string;
    description: string;
    texts: string[];
}