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
                label: 'Progetti consegnati',
                valueSuffix: 'progetti seguiti end-to-end',
                detail: "Include applicazioni web, strumenti interni e MVP consegnati dall'analisi iniziale al rilascio e supporto."
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
                label: 'Projects shipped',
                valueSuffix: 'end-to-end builds',
                detail: 'Covers web apps, internal tools and MVPs delivered from early discovery through release and support.'
            },
            {
                icon: 'code',
                label: 'Core stack',
                detail: 'Core technology stack applied daily to design interfaces and orchestrate full-stack applications.'
            },
        ]
    }
};
