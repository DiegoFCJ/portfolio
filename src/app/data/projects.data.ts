import { ProjectsLangs } from '../dtos/ProjectDTO';

export const projects: ProjectsLangs = {
    it: {
        title: 'Progetti in Evidenza',
        button: 'Apri il progetto',
        imageAltPrefix: 'Anteprima del progetto ',
        toggle: {
            expand: 'Mostra dettagli',
            collapse: 'Riduci dettagli'
        },
        navigation: {
            previous: 'Progetto precedente',
            next: 'Progetto successivo'
        },
        statusLegend: {
            prefix: 'Stato',
            levels: {
                active: 'Attivo',
                publicBeta: 'Beta pubblica',
                inDevelopment: 'In sviluppo'
            },
            tags: {
                openSource: 'Open source',
                release2024: 'Lancio 2024'
            }
        },
        linksLegend: {
            code: {
                availableLabel: 'Codice sorgente',
                privateLabel: 'Codice privato',
                unavailableLabel: 'Codice non disponibile'
            },
            preview: {
                siteLabel: 'Visita il sito',
                demoLabel: 'Visita demo',
                unavailableLabel: 'Demo non disponibile'
            }
        },
        projects: [
            {
                title: 'Borgo Samarina',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Portale turistico responsive per valorizzare il borgo con itinerari, galleria stagionale e copy gestito da CMS headless (codice privato).',
                image: 'assets/projects/borgo-samarina-cover.png',
                links: {
                    code: {
                        state: 'private'
                    },
                    site: {
                        state: 'available',
                        url: 'https://borgosamarina-com.web.app/'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Suite modulare di mini-giochi casual con core condiviso, profili giocatore e leaderboard mobile-ready per sessioni rapide.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Hub di produttività che traccia abitudini, espone un marketplace di plugin e sincronizza obiettivi con promemoria su calendario multi-dispositivo.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Template headless per e-commerce con checkout modulare, workflow di magazzino e dashboard amministrativa pronta per integrazioni ERP.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                links: {
                    code: {
                        state: 'available',
                        url: 'https://github.com/DiegoFCJ/E-commerce'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            }
        ]
    },
    en: {
        title: 'Featured Projects',
        button: 'View Project',
        imageAltPrefix: 'Project preview: ',
        toggle: {
            expand: 'Show details',
            collapse: 'Hide details'
        },
        navigation: {
            previous: 'Previous project',
            next: 'Next project'
        },
        statusLegend: {
            prefix: 'Status',
            levels: {
                active: 'Active',
                publicBeta: 'Public beta',
                inDevelopment: 'In development'
            },
            tags: {
                openSource: 'Open source',
                release2024: '2024 launch'
            }
        },
        linksLegend: {
            code: {
                availableLabel: 'Source code',
                privateLabel: 'Private codebase',
                unavailableLabel: 'Code unavailable'
            },
            preview: {
                siteLabel: 'Visit site',
                demoLabel: 'View demo',
                unavailableLabel: 'Demo unavailable'
            }
        },
        projects: [
            {
                title: 'Borgo Samarina',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Responsive tourism portal celebrating the seaside village with curated itineraries, seasonal gallery and CMS-driven copy (private codebase).',
                image: 'assets/projects/borgo-samarina-cover.png',
                links: {
                    code: {
                        state: 'private'
                    },
                    site: {
                        state: 'available',
                        url: 'https://borgosamarina-com.web.app/'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Modular suite of casual mini-games with shared core, player profiles and a mobile-ready leaderboard for quick sessions.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Productivity hub that tracks habits, exposes a plugin marketplace and syncs goals with calendar reminders across devices.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Headless commerce template with modular checkout, inventory workflows and an admin dashboard ready for ERP integrations.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                links: {
                    code: {
                        state: 'available',
                        url: 'https://github.com/DiegoFCJ/E-commerce'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            }
        ]
    },
    de: {
        title: 'Ausgewählte Projekte',
        button: 'Projekt ansehen',
        imageAltPrefix: 'Projektvorschau: ',
        toggle: {
            expand: 'Details anzeigen',
            collapse: 'Details ausblenden'
        },
        navigation: {
            previous: 'Vorheriges Projekt',
            next: 'Nächstes Projekt'
        },
        statusLegend: {
            prefix: 'Status',
            levels: {
                active: 'Aktiv',
                publicBeta: 'Öffentliche Beta',
                inDevelopment: 'In Entwicklung'
            },
            tags: {
                openSource: 'Open Source',
                release2024: 'Release 2024'
            }
        },
        linksLegend: {
            code: {
                availableLabel: 'Quellcode',
                privateLabel: 'Private Codebasis',
                unavailableLabel: 'Code nicht verfügbar'
            },
            preview: {
                siteLabel: 'Website besuchen',
                demoLabel: 'Demo ansehen',
                unavailableLabel: 'Demo nicht verfügbar'
            }
        },
        projects: [
            {
                title: 'Borgo Samarina',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Responsives Tourismusportal, das das Küstendorf mit kuratierten Routen, saisonaler Galerie und CMS-verwaltetem Text hervorhebt (private Codebasis).',
                image: 'assets/projects/borgo-samarina-cover.png',
                links: {
                    code: {
                        state: 'private'
                    },
                    site: {
                        state: 'available',
                        url: 'https://borgosamarina-com.web.app/'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Modulare Suite lässiger Minispiele mit gemeinsamem Kern, Spielerprofilen und einer mobiloptimierten Bestenliste für kurze Sessions.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Produktivitätshub, der Gewohnheiten verfolgt, einen Plugin-Marktplatz anbietet und Ziele mit geräteübergreifenden Kalendererinnerungen synchronisiert.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Headless-E-Commerce-Template mit modularem Checkout, Lager-Workflows und Administrationsdashboard, bereit für ERP-Integrationen.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                links: {
                    code: {
                        state: 'available',
                        url: 'https://github.com/DiegoFCJ/E-commerce'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            }
        ]
    },
    es: {
        title: 'Proyectos destacados',
        button: 'Ver proyecto',
        imageAltPrefix: 'Vista previa del proyecto ',
        toggle: {
            expand: 'Mostrar detalles',
            collapse: 'Ocultar detalles'
        },
        navigation: {
            previous: 'Proyecto anterior',
            next: 'Siguiente proyecto'
        },
        statusLegend: {
            prefix: 'Estado',
            levels: {
                active: 'Activo',
                publicBeta: 'Beta pública',
                inDevelopment: 'En desarrollo'
            },
            tags: {
                openSource: 'Código abierto',
                release2024: 'Lanzamiento 2024'
            }
        },
        linksLegend: {
            code: {
                availableLabel: 'Código fuente',
                privateLabel: 'Código privado',
                unavailableLabel: 'Código no disponible'
            },
            preview: {
                siteLabel: 'Visitar sitio',
                demoLabel: 'Ver demo',
                unavailableLabel: 'Demo no disponible'
            }
        },
        projects: [
            {
                title: 'Borgo Samarina',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Portal turístico responsive que destaca el pueblo costero con itinerarios curados, galería estacional y textos gestionados desde un CMS headless (código privado).',
                image: 'assets/projects/borgo-samarina-cover.png',
                links: {
                    code: {
                        state: 'private'
                    },
                    site: {
                        state: 'available',
                        url: 'https://borgosamarina-com.web.app/'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Suite modular de minijuegos casuales con núcleo compartido, perfiles de jugador y clasificación preparada para móviles para partidas rápidas.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Centro de productividad que registra hábitos, ofrece un mercado de plugins y sincroniza objetivos con recordatorios en calendario multiplataforma.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Plantilla headless para comercio electrónico con checkout modular, flujos de almacén y panel administrativo listo para integraciones ERP.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                links: {
                    code: {
                        state: 'available',
                        url: 'https://github.com/DiegoFCJ/E-commerce'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            }
        ]
    },
    no: {
        title: 'Utvalgte prosjekter',
        button: 'Åpne prosjektet',
        imageAltPrefix: 'Forhåndsvisning av prosjektet ',
        toggle: {
            expand: 'Vis detaljer',
            collapse: 'Skjul detaljer'
        },
        navigation: {
            previous: 'Forrige prosjekt',
            next: 'Neste prosjekt'
        },
        statusLegend: {
            prefix: 'Status',
            levels: {
                active: 'Aktiv',
                publicBeta: 'Offentlig beta',
                inDevelopment: 'Under utvikling'
            },
            tags: {
                openSource: 'Åpen kildekode',
                release2024: 'Lansering 2024'
            }
        },
        linksLegend: {
            code: {
                availableLabel: 'Kildekode',
                privateLabel: 'Privat kodebase',
                unavailableLabel: 'Kode ikke tilgjengelig'
            },
            preview: {
                siteLabel: 'Besøk nettsted',
                demoLabel: 'Se demo',
                unavailableLabel: 'Demo ikke tilgjengelig'
            }
        },
        projects: [
            {
                title: 'Borgo Samarina',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Responsivt turistnettsted som fremhever kystlandsbyen med kuraterte ruter, sesonggalleri og CMS-styrt innhold (privat kodebase).',
                image: 'assets/projects/borgo-samarina-cover.png',
                links: {
                    code: {
                        state: 'private'
                    },
                    site: {
                        state: 'available',
                        url: 'https://borgosamarina-com.web.app/'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Modulær samling av uformelle minispill med delt kjerne, spillerprofiler og en mobiltilpasset toppliste for korte økter.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Produktivitetshub som følger vaner, tilbyr et plugin-marked og synkroniserer mål med påminnelser på tvers av enheter.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Headless-mal for netthandel med modulær checkout, lagerflyt og administrasjonsdashbord klart for ERP-integrasjoner.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                links: {
                    code: {
                        state: 'available',
                        url: 'https://github.com/DiegoFCJ/E-commerce'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            }
        ]
    },
    ru: {
        title: 'Избранные проекты',
        button: 'Открыть проект',
        imageAltPrefix: 'Превью проекта ',
        toggle: {
            expand: 'Показать детали',
            collapse: 'Скрыть детали'
        },
        navigation: {
            previous: 'Предыдущий проект',
            next: 'Следующий проект'
        },
        statusLegend: {
            prefix: 'Статус',
            levels: {
                active: 'Активный',
                publicBeta: 'Публичная бета',
                inDevelopment: 'В разработке'
            },
            tags: {
                openSource: 'Открытый код',
                release2024: 'Запуск в 2024'
            }
        },
        linksLegend: {
            code: {
                availableLabel: 'Исходный код',
                privateLabel: 'Приватный репозиторий',
                unavailableLabel: 'Код недоступен'
            },
            preview: {
                siteLabel: 'Перейти на сайт',
                demoLabel: 'Посмотреть демо',
                unavailableLabel: 'Демо недоступно'
            }
        },
        projects: [
            {
                title: 'Borgo Samarina',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Адаптивный туристический портал, рассказывающий о прибрежном городке с подобранными маршрутами, сезонной галереей и контентом из headless CMS (код закрытый).',
                image: 'assets/projects/borgo-samarina-cover.png',
                links: {
                    code: {
                        state: 'private'
                    },
                    site: {
                        state: 'available',
                        url: 'https://borgosamarina-com.web.app/'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Micro Games',
                status: {
                    level: 'active',
                    tags: ['openSource']
                },
                technologies: ['Angular 16', 'TypeScript', 'RxJS', 'SCSS', 'Node.js'],
                description: 'Модульный набор казуальных мини-игр с общей основой, профилями игроков и мобильным рейтинговым списком для коротких сессий.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'Self',
                status: {
                    level: 'publicBeta',
                    tags: ['release2024']
                },
                technologies: ['Angular 17', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
                description: 'Платформа продуктивности, которая отслеживает привычки, предлагает маркетплейс плагинов и синхронизирует цели с напоминаниями на разных устройствах.',
                image: 'https://github.com/DiegoFCJ/self/blob/master/self.png?raw=true',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            },
            {
                title: 'E-commerce',
                status: {
                    level: 'inDevelopment'
                },
                technologies: ['Spring Boot 3', 'Angular 17', 'MySQL', 'Keycloak', 'Docker'],
                description: 'Headless-шаблон интернет-магазина с модульным оформлением заказа, складскими процессами и административной панелью, готовой к интеграции с ERP.',
                image: 'https://github.com/DiegoFCJ/E-commerce/blob/master/overview/homeSideDash.png?raw=true',
                links: {
                    code: {
                        state: 'available',
                        url: 'https://github.com/DiegoFCJ/E-commerce'
                    },
                    site: {
                        state: 'unavailable'
                    },
                    demo: {
                        state: 'unavailable'
                    }
                }
            }
        ]
    }
};
