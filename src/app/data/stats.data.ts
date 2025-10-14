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
    },
    no: {
        title: 'Nøkkeltall',
        stats: [
            {
                icon: 'schedule',
                label: 'Totale timer',
                valueSuffix: 'timer med utvikling',
                detail: 'Anslått sum av utviklingstimer i dokumenterte oppdrag, beregnet med 40-timers uker uten dobbeltføring av overlappende perioder og med slingringsmonn for pågående arbeid.'
            },
            {
                icon: 'today',
                label: 'Erfaringsmåneder',
                valueSuffix: 'måneder på virkelige prosjekter',
                detail: 'Totalt antall aktive måneder på reelle prosjekter, telt uten å legge sammen parallelle perioder og med fokus på konkrete ansvarsområder.'
            },
            {
                icon: 'work',
                label: 'Prosjekter jeg har bidratt til',
                valueSuffix: 'initiativ med direkte påvirkning',
                detail: 'Omfatter nettapplikasjoner, interne verktøy og MVP-er der jeg har bidratt fra tidlig innsikt til lansering og videre støtte.'
            },
            {
                icon: 'code',
                label: 'Kjernestack',
                detail: 'Hovedstacken jeg bruker daglig for å designe grensesnitt og orkestrere fullstack-applikasjoner.'
            },
        ]
    },
    ru: {
        title: 'Ключевые показатели',
        stats: [
            {
                icon: 'schedule',
                label: 'Всего часов',
                valueSuffix: 'часов разработки',
                detail: 'Оценка суммарных часов разработки по документированным проектам, рассчитанная исходя из 40-часовой недели без учёта пересекающихся периодов и с запасом на текущую работу.'
            },
            {
                icon: 'today',
                label: 'Месяцы опыта',
                valueSuffix: 'месяцев на реальных проектах',
                detail: 'Количество активных месяцев, проведённых на реальных проектах, без двойного учёта параллельных назначений и с упором на практические задачи.'
            },
            {
                icon: 'work',
                label: 'Проекты с моим участием',
                valueSuffix: 'инициативы с прямым вкладом',
                detail: 'Включает веб-приложения, внутренние инструменты и MVP, где я участвовал от раннего анализа до релиза и последующей поддержки.'
            },
            {
                icon: 'code',
                label: 'Основной стек',
                detail: 'Базовый технологический стек, который я ежедневно применяю для проектирования интерфейсов и оркестрации full-stack приложений.'
            },
        ]
    }
};
