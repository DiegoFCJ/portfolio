import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    en: {
        title: 'Statistics',
        stats: [
            { icon: 'today', label: 'Total Months', value: '44+ months delivering value', metric: 'months' },
            { icon: 'work', label: 'Projects Delivered', value: '8 projects delivered', metric: 'projects' },
            { icon: 'settings', label: 'Processes Automated', value: '3+ processes automated', metric: 'automations' },
            { icon: 'code', label: 'Core Stack', value: 'Spring Boot · Java · Angular · SQL Server', metric: 'coreStack' },
        ]
    },
    it: {
        title: 'Statistiche',
        stats: [
            { icon: 'today', label: 'Mesi Totali', value: '44+ mesi di risultati', metric: 'months' },
            { icon: 'work', label: 'Progetti Consegnati', value: '8 progetti consegnati', metric: 'projects' },
            { icon: 'settings', label: 'Processi Automatizzati', value: '3+ processi automatizzati', metric: 'automations' },
            { icon: 'code', label: 'Stack Principale', value: 'Spring Boot · Java · Angular · SQL Server', metric: 'coreStack' },
        ]
    },
    de: {
        title: 'Statistiken',
        stats: [
            { icon: 'today', label: 'Gesamtmonate', value: '44+ Monate mit Mehrwert', metric: 'months' },
            { icon: 'work', label: 'Gelieferte Projekte', value: '8 gelieferte Projekte', metric: 'projects' },
            { icon: 'settings', label: 'Automatisierte Prozesse', value: '3+ automatisierte Prozesse', metric: 'automations' },
            { icon: 'code', label: 'Kerntechnologien', value: 'Spring Boot · Java · Angular · SQL Server', metric: 'coreStack' },
        ]
    },
    es: {
        title: 'Estadísticas',
        stats: [
            { icon: 'today', label: 'Meses Totales', value: '44+ meses generando impacto', metric: 'months' },
            { icon: 'work', label: 'Proyectos Entregados', value: '8 proyectos entregados', metric: 'projects' },
            { icon: 'settings', label: 'Procesos Automatizados', value: '3+ procesos automatizados', metric: 'automations' },
            { icon: 'code', label: 'Tecnologías Clave', value: 'Spring Boot · Java · Angular · SQL Server', metric: 'coreStack' },
        ]
    }
};
