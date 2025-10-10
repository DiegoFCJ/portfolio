import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    it: {
        title: 'Numeri chiave',
        stats: [
            {
                icon: 'schedule',
                label: 'Ore totali',
                valueSuffix: 'ore di sviluppo',
                detail: 'Somma delle ore di sviluppo stimate sulle esperienze documentate, con media di 40 ore settimanali e un margine per attività correnti.'
            },
            {
                icon: 'today',
                label: 'Mesi di esperienza',
                valueSuffix: 'mesi su progetti reali',
                detail: 'Numero di mesi effettivi passati su progetti reali, considerando sovrapposizioni e responsabilità parallele.'
            },
            {
                icon: 'work',
                label: 'Progetti a cui ho contribuito',
                valueSuffix: 'contributi end-to-end',
                detail: 'Somma di progetti interni, consulenze e iniziative personali in cui ho seguito il ciclo completo dalla discovery al rilascio.'
            },
            {
                icon: 'code',
                label: 'Stack principale',
                detail: 'Stack tecnologico principale utilizzato quotidianamente per progettare interfacce e orchestrare applicazioni full-stack.'
            },
        ]
    },
    en: {
        title: 'Key numbers',
        stats: [
            {
                icon: 'schedule',
                label: 'Total hours',
                valueSuffix: 'engineering hours',
                detail: 'Estimated development hours across documented engagements, using a 40-hour weekly average plus a buffer for ongoing work.'
            },
            {
                icon: 'today',
                label: 'Experience months',
                valueSuffix: 'months on real projects',
                detail: 'Total active months on real-world projects, accounting for overlapping assignments and parallel responsibilities.'
            },
            {
                icon: 'work',
                label: 'Projects contributed to',
                valueSuffix: 'end-to-end contributions',
                detail: 'Sum of internal products, consulting work and personal initiatives followed from discovery to release.'
            },
            {
                icon: 'code',
                label: 'Core stack',
                detail: 'Core technology stack applied daily to design interfaces and orchestrate full-stack applications.'
            },
        ]
    }
};
