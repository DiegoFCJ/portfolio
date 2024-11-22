import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    en: {
        title: 'Statistics',
        stats: [
            { icon: 'history', label: 'Total Hours', value: '0' },
            { icon: 'today', label: 'Total Months', value: '0' },
            { icon: 'work', label: 'Projects', value: '0' },
            { icon: 'apps', label: 'Most Used', value: 'Spring Boot, Java, Angular, MYSQL' },
        ]
    },
    it: {
        title: 'Statistiche',
        stats: [
            { icon: 'history', label: 'Ore Totali', value: '0' },
            { icon: 'today', label: 'Mesi Totali', value: '0' },
            { icon: 'work', label: 'Progetti', value: '0' },
            { icon: 'apps', label: 'Più Usato', value: 'Spring Boot, Java, Angular, MYSQL' },
        ]
    }
};