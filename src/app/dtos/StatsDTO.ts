export interface Stats {
    en: StatsFull,
    it: StatsFull,
    de: StatsFull,
    es: StatsFull,
    [key: string]: StatsFull;
}

export interface StatsFull {
    title: string;
    stats: Stat[];
}

export interface Stat {
    icon: string;
    value: string;
    label: string;
}

export interface StatsItem {
    hours: string;
    months: string;
    projects: string;
    mostUsed: string;
}
