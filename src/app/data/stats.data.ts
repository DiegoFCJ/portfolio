import { Stats } from "../dtos/StatsDTO";

export const statsData: Stats = {
    it: {
        title: 'Statistiche',
        stats: [
            { icon: 'schedule', label: 'Ore Totali', value: 'Oltre 7K ore di ingegneria' },
            { icon: 'today', label: 'Mesi di Esperienza', value: 'Oltre 44 mesi di valore progettuale' },
            { icon: 'work', label: 'Progetti Consegnati', value: '8 iniziative end-to-end' },
            { icon: 'code', label: 'Stack Principale', value: 'Spring Boot · Java · Angular · SQL Server' },
        ]
    },
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
            { icon: 'schedule', label: 'Ore totali', value: 'Oltre 7K ore di ingegneria' },
            { icon: 'today', label: "Mesi d'esperienza", value: 'Più di 44 mesi di delivery continuativa' },
            { icon: 'work', label: 'Progetti consegnati', value: '8 iniziative end-to-end' },
            { icon: 'code', label: 'Stack principale', value: 'Spring Boot · Java · Angular · SQL Server' },
        ]
    }
};
