import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    en: {
        title: 'Statistics',
        stats: [
            { icon: 'schedule', label: 'Total Hours', value: '7K+ engineering hours' },
            { icon: 'today', label: 'Experience Months', value: '44+ months delivering value' },
            { icon: 'work', label: 'Projects Delivered', value: '8 end-to-end initiatives' },
            { icon: 'code', label: 'Core Stack', value: 'Spring Boot · Java · Angular · SQL Server' },
        ]
    },
    it: {
        title: 'Statistiche',
        stats: [
            { icon: 'schedule', label: 'Ore Totali', value: 'Oltre 7K ore di sviluppo' },
            { icon: 'today', label: 'Mesi di Esperienza', value: '44+ mesi di risultati' },
            { icon: 'work', label: 'Progetti Consegnati', value: '8 iniziative end-to-end' },
            { icon: 'code', label: 'Stack Principale', value: 'Spring Boot · Java · Angular · SQL Server' },
        ]
    },
    de: {
        title: 'Statistiken',
        stats: [
            { icon: 'schedule', label: 'Gesamtstunden', value: 'Über 7K Stunden Engineering' },
            { icon: 'today', label: 'Erfahrungsmonate', value: '44+ Monate mit Mehrwert' },
            { icon: 'work', label: 'Gelieferte Projekte', value: '8 End-to-End-Initiativen' },
            { icon: 'code', label: 'Kerntechnologien', value: 'Spring Boot · Java · Angular · SQL Server' },
        ]
    },
    es: {
        title: 'Estadísticas',
        stats: [
            { icon: 'schedule', label: 'Horas Totales', value: 'Más de 7K horas de ingeniería' },
            { icon: 'today', label: 'Meses de Experiencia', value: '44+ meses generando impacto' },
            { icon: 'work', label: 'Proyectos Entregados', value: '8 iniciativas end-to-end' },
            { icon: 'code', label: 'Tecnologías Clave', value: 'Spring Boot · Java · Angular · SQL Server' },
        ]
    }
};
