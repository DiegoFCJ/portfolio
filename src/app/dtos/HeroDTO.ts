export interface HeroFullLangs {
    en: HeroFull;
    it: HeroFull;
    de?: HeroFull;
    es?: HeroFull;
    [key: string]: HeroFull | undefined;
}

export interface HeroFull {
    button: string;
    description: string;
    texts: string[];
}