import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    en: {
        title: 'Statistics',
        stats: [
            { icon: 'today', label: 'Total Months', value: '73+ months of experience' },
            { icon: 'work', label: 'Projects Delivered', value: '6 major initiatives' },
            { icon: 'autorenew', label: 'Processes Automated', value: '10+ end-to-end workflows' },
            { icon: 'code', label: 'Core Stack', value: 'Spring Boot · Java · Angular · MySQL' },
        ]
    },
    it: {
        title: 'Statistiche',
        stats: [
            { icon: 'today', label: 'Mesi Totali', value: '73+ mesi di esperienza' },
            { icon: 'work', label: 'Progetti Consegnati', value: '6 iniziative principali' },
            { icon: 'autorenew', label: 'Processi Automatizzati', value: '10+ flussi end-to-end' },
            { icon: 'code', label: 'Stack Principale', value: 'Spring Boot · Java · Angular · MySQL' },
        ]
    },
    de: {
        title: 'Statistiken',
        stats: [
            { icon: 'today', label: 'Gesamtmonate', value: '73+ Monate Erfahrung' },
            { icon: 'work', label: 'Abgeschlossene Projekte', value: '6 zentrale Initiativen' },
            { icon: 'autorenew', label: 'Automatisierte Prozesse', value: 'Über 10 End-to-End-Workflows' },
            { icon: 'code', label: 'Kerntechnologien', value: 'Spring Boot · Java · Angular · MySQL' },
        ]
    },
    es: {
        title: 'Estadísticas',
        stats: [
            { icon: 'today', label: 'Meses Totales', value: '73+ meses de experiencia' },
            { icon: 'work', label: 'Proyectos Entregados', value: '6 iniciativas clave' },
            { icon: 'autorenew', label: 'Procesos Automatizados', value: 'Más de 10 flujos end-to-end' },
            { icon: 'code', label: 'Tecnologías Clave', value: 'Spring Boot · Java · Angular · MySQL' },
        ]
    }
};
