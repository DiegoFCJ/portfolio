export interface Stats {
    en: StatsFull;
    it: StatsFull;
    de?: StatsFull;
    es?: StatsFull;
    [key: string]: StatsFull | undefined;
}

export interface StatsFull {
    title: string;
    stats: Stat[];
}

export interface Stat {
    icon: string;
    label: string;
    valueSuffix?: string;
}

export interface StatsMetrics {
    hoursValue: string;
    hoursSuffix: string;
    monthsValue: string;
    monthsSuffix: string;
    projectsValue: string;
    projectsSuffix: string;
    mostUsedValue: string;
    mostUsedSuffix?: string;
}
