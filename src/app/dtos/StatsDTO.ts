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

export type StatsMetric = 'months' | 'projects' | 'automations' | 'coreStack';

export interface Stat {
    icon: string;
    value: string;
    label: string;
    metric: StatsMetric;
}

export interface StatsItem {
    months: string;
    projects: string;
    automations: string;
    coreStack: string;
    [key: string]: string;
}
