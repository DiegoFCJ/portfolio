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
                valueSuffix: 'timer med utviklingsarbeid',
                detail: 'Estimert utviklingstid på dokumenterte oppdrag, basert på en gjennomsnittlig 40-timers uke uten dobbeltføring av overlappende perioder og med margin for pågående arbeid.'
            },
            {
                icon: 'today',
                label: 'Måneder med erfaring',
                valueSuffix: 'måneder på faktiske prosjekter',
                detail: 'Totalt aktive måneder i reelle prosjekter, uten å telle overlappende perioder og med fokus på praktiske ansvarsområder.'
            },
            {
                icon: 'work',
                label: 'Prosjekter med bidrag',
                valueSuffix: 'initiativer med direkte innvirkning',
                detail: 'Omfatter nettapplikasjoner, interne verktøy og MVP-er der jeg bidro fra tidlig utforsking til lansering og videre støtte.'
            },
            {
                icon: 'code',
                label: 'Kjernestack',
                detail: 'Kjerneteknologier brukt daglig til å designe grensesnitt og orkestrere fullstack-applikasjoner.'
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
                detail: 'Оценка часов разработки по документированным проектам: расчёт из 40-часовой недели без двойного учёта пересекающихся периодов и с запасом на текущую работу.'
            },
            {
                icon: 'today',
                label: 'Месяцы опыта',
                valueSuffix: 'месяцев на реальных проектах',
                detail: 'Общее количество активных месяцев на реальных проектах, без двойного учёта пересечений и с акцентом на практические задачи.'
            },
            {
                icon: 'work',
                label: 'Проекты с моим участием',
                valueSuffix: 'инициатив с прямым вкладом',
                detail: 'Включает веб-приложения, внутренние инструменты и MVP, где я участвовал от раннего исследования до релиза и последующей поддержки.'
            },
            {
                icon: 'code',
                label: 'Основной стек',
                detail: 'Основной технологический стек, который я использую ежедневно для проектирования интерфейсов и координации full-stack приложений.'
            },
        ]
    }
};
