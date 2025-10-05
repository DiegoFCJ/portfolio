import { LanguageMap } from '../models/language.types';

export type Stats = LanguageMap<StatsFull>;

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
