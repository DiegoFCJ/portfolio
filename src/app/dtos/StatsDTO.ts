import { LanguageCode } from '../models/language-code.type';

export type Stats = Partial<Record<LanguageCode, StatsFull>>;

export interface StatsFull {
    title: string;
    stats: Stat[];
}

export interface Stat {
    icon: string;
    label: string;
    valueSuffix?: string;
    detail: string;
    detailItems?: string[];
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
    detailItems: {
        hours: string[];
        months: string[];
        projects: string[];
        stack: string[];
    };
}

