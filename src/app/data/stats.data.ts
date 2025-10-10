import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    it: {
        title: 'Numeri chiave',
        stats: [
            {
                icon: 'schedule',
                label: 'Ore totali',
                valueSuffix: 'ore di sviluppo',
                detail: 'Somma stimata delle ore di sviluppo sulle esperienze documentate, calcolata su 40 ore settimanali senza duplicare periodi sovrapposti e con margine per attività correnti.'
            },
            {
                icon: 'today',
                label: 'Mesi di esperienza',
                valueSuffix: 'mesi su progetti reali',
                detail: 'Numero di mesi effettivi trascorsi su progetti reali, conteggiati senza sovrapporre periodi paralleli e legati ad attività concrete.'
            },
            {
                icon: 'work',
                label: 'Progetti supportati',
                valueSuffix: 'iniziative con contributo diretto',
                detail: 'Include applicazioni web, strumenti interni e MVP in cui ho contribuito dalle fasi iniziali fino al supporto post-rilascio.'
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
                detail: 'Estimated development hours across documented engagements, based on a 40-hour weekly average without double-counting overlapping assignments and with a buffer for ongoing work.'
            },
            {
                icon: 'today',
                label: 'Experience months',
                valueSuffix: 'months on real projects',
                detail: 'Total active months on real-world projects, counted without double-counting overlapping assignments and focused on hands-on responsibilities.'
            },
            {
                icon: 'work',
                label: 'Projects contributed to',
                valueSuffix: 'initiatives with direct impact',
                detail: 'Covers web apps, internal tools and MVPs where I contributed from early discovery through release and ongoing support.'
            },
            {
                icon: 'code',
                label: 'Core stack',
                detail: 'Core technology stack applied daily to design interfaces and orchestrate full-stack applications.'
            },
        ]
    }
};
