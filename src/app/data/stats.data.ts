import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    it: {
        title: 'Numeri chiave',
        stats: [
            { icon: 'schedule', label: 'Ore', valueSuffix: 'di sviluppo' },
            { icon: 'today', label: 'Mesi', valueSuffix: 'di esperienza reale' },
            { icon: 'work', label: 'Progetti', valueSuffix: 'completati' },
            { icon: 'code', label: 'Stack' },
        ]
    },
    en: {
        title: 'Key numbers',
        stats: [
            { icon: 'schedule', label: 'Hours', valueSuffix: 'of coding' },
            { icon: 'today', label: 'Months', valueSuffix: 'hands-on' },
            { icon: 'work', label: 'Projects', valueSuffix: 'delivered' },
            { icon: 'code', label: 'Stack' },
        ]
    }
};
