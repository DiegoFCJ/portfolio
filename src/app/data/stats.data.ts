import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    it: {
        title: 'Numeri chiave',
        stats: [
            { icon: 'schedule', label: 'Ore totali', valueSuffix: 'ore di sviluppo' },
            { icon: 'today', label: 'Mesi di esperienza', valueSuffix: 'mesi su progetti reali' },
            { icon: 'work', label: 'Progetti consegnati', valueSuffix: 'progetti seguiti end-to-end' },
            { icon: 'code', label: 'Stack principale' },
        ]
    },
    en: {
        title: 'Key numbers',
        stats: [
            { icon: 'schedule', label: 'Total hours', valueSuffix: 'engineering hours' },
            { icon: 'today', label: 'Experience months', valueSuffix: 'months on real projects' },
            { icon: 'work', label: 'Projects shipped', valueSuffix: 'end-to-end builds' },
            { icon: 'code', label: 'Core stack' },
        ]
    }
};
