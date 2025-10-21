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
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Portale turistico responsive sviluppato in Next.js per valorizzare il borgo con itinerari, galleria stagionale e copy gestito da CMS headless (codice privato).',
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
                    level: 'inDevelopment'
                },
                technologies: ['Angular 16', 'TypeScript', 'SCSS', 'Java', 'Spring Boot', 'Docker', 'Docker Compose', 'Firebase'],
                description: 'Suite modulare di mini-giochi casual con core condiviso, backend Spring Boot containerizzato e servizi Firebase per profili e classifiche.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Daily Reporter',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Google Apps Script', 'Google Workspace'],
                description: 'App Angular collegata a Google Apps Script che automatizza il recap giornaliero delle attività su Fogli Google e invia report al team.',
                image: 'assets/projects/daily-reporter-cover.svg',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Scriptagher',
                status: {
                    level: 'active'
                },
                technologies: ['SQLite', 'Dart', 'Flutter', 'Angular'],
                description: 'Ecosistema ibrido che raccoglie script di automazione: app Flutter offline con storage SQLite e pannello Angular per pubblicare snippet riutilizzabili.',
                image: 'assets/projects/scriptagher-cover.svg',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'available',
                        url: 'https://diegofcj.github.io/scriptagher/'
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
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Responsive tourism portal built with Next.js to celebrate the seaside village with curated itineraries, seasonal gallery and CMS-driven copy (private codebase).',
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
                    level: 'inDevelopment'
                },
                technologies: ['Angular 16', 'TypeScript', 'SCSS', 'Java', 'Spring Boot', 'Docker', 'Docker Compose', 'Firebase'],
                description: 'Modular suite of casual mini-games with a shared Angular core, Spring Boot microservices packaged with Docker and Firebase services for players and leaderboards.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Daily Reporter',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Google Apps Script', 'Google Workspace'],
                description: 'Angular companion app wired to Google Apps Script that automates the daily recap on Google Sheets and sends structured reports to the team.',
                image: 'assets/projects/daily-reporter-cover.svg',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Scriptagher',
                status: {
                    level: 'active'
                },
                technologies: ['SQLite', 'Dart', 'Flutter', 'Angular'],
                description: 'Hybrid automation ecosystem combining an offline Flutter app backed by SQLite with an Angular dashboard to publish reusable scripting recipes.',
                image: 'assets/projects/scriptagher-cover.svg',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'available',
                        url: 'https://diegofcj.github.io/scriptagher/'
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
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Responsives Tourismusportal auf Next.js-Basis, das das Küstendorf mit kuratierten Routen, saisonaler Galerie und CMS-verwaltetem Text hervorhebt (private Codebasis).',
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
                    level: 'inDevelopment'
                },
                technologies: ['Angular 16', 'TypeScript', 'SCSS', 'Java', 'Spring Boot', 'Docker', 'Docker Compose', 'Firebase'],
                description: 'Modulare Suite lässiger Minispiele mit gemeinsamem Angular-Kern, Spring-Boot-Backend in Docker-Containern und Firebase-Diensten für Profile und Bestenlisten.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Daily Reporter',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Google Apps Script', 'Google Workspace'],
                description: 'Angular-Anwendung, die mit Google Apps Script verbunden ist, um tägliche Zusammenfassungen in Google Sheets zu automatisieren und strukturierte Reports ans Team zu senden.',
                image: 'assets/projects/daily-reporter-cover.svg',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Scriptagher',
                status: {
                    level: 'active'
                },
                technologies: ['SQLite', 'Dart', 'Flutter', 'Angular'],
                description: 'Hybrides Automations-Ökosystem mit einer offlinefähigen Flutter-App auf SQLite-Basis und einem Angular-Dashboard zum Veröffentlichen wiederverwendbarer Skript-Rezepte.',
                image: 'assets/projects/scriptagher-cover.svg',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'available',
                        url: 'https://diegofcj.github.io/scriptagher/'
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
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Portal turístico responsive construido con Next.js que destaca el pueblo costero con itinerarios curados, galería estacional y textos gestionados desde un CMS headless (código privado).',
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
                    level: 'inDevelopment'
                },
                technologies: ['Angular 16', 'TypeScript', 'SCSS', 'Java', 'Spring Boot', 'Docker', 'Docker Compose', 'Firebase'],
                description: 'Suite modular de minijuegos casuales con núcleo Angular compartido, microservicios Spring Boot en contenedores Docker y servicios Firebase para perfiles y clasificaciones.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Daily Reporter',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Google Apps Script', 'Google Workspace'],
                description: 'Aplicación Angular conectada a Google Apps Script que automatiza el resumen diario en Hojas de Google y envía reportes estructurados al equipo.',
                image: 'assets/projects/daily-reporter-cover.svg',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Scriptagher',
                status: {
                    level: 'active'
                },
                technologies: ['SQLite', 'Dart', 'Flutter', 'Angular'],
                description: 'Ecosistema híbrido de automatización con app Flutter offline sobre SQLite y panel Angular para publicar recetas de scripts reutilizables.',
                image: 'assets/projects/scriptagher-cover.svg',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'available',
                        url: 'https://diegofcj.github.io/scriptagher/'
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
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Responsivt turistnettsted bygget med Next.js som fremhever kystlandsbyen med kuraterte ruter, sesonggalleri og CMS-styrt innhold (privat kodebase).',
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
                    level: 'inDevelopment'
                },
                technologies: ['Angular 16', 'TypeScript', 'SCSS', 'Java', 'Spring Boot', 'Docker', 'Docker Compose', 'Firebase'],
                description: 'Modulær samling av uformelle minispill med delt Angular-kjerne, Spring Boot-mikrotjenester i Docker-containere og Firebase-tjenester for profiler og topplister.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Daily Reporter',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Google Apps Script', 'Google Workspace'],
                description: 'Angular-applikasjon koblet til Google Apps Script som automatiserer den daglige oppsummeringen i Google Regneark og sender strukturerte rapporter til teamet.',
                image: 'assets/projects/daily-reporter-cover.svg',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Scriptagher',
                status: {
                    level: 'active'
                },
                technologies: ['SQLite', 'Dart', 'Flutter', 'Angular'],
                description: 'Hybrid automasjonsøkosystem med offline Flutter-app på SQLite og et Angular-kontrollpanel for å publisere gjenbrukbare skriptoppskrifter.',
                image: 'assets/projects/scriptagher-cover.svg',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'available',
                        url: 'https://diegofcj.github.io/scriptagher/'
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
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase Hosting'],
                description: 'Адаптивный туристический портал на Next.js, рассказывающий о прибрежном городке с подобранными маршрутами, сезонной галереей и контентом из headless CMS (код закрытый).',
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
                    level: 'inDevelopment'
                },
                technologies: ['Angular 16', 'TypeScript', 'SCSS', 'Java', 'Spring Boot', 'Docker', 'Docker Compose', 'Firebase'],
                description: 'Модульный набор казуальных мини-игр с общей Angular-основой, микросервисами Spring Boot в Docker-контейнерах и Firebase для профилей и таблиц лидеров.',
                image: 'https://github.com/DiegoFCJ/MicroGames/blob/master/overview/loggedPage.png?raw=true',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Daily Reporter',
                status: {
                    level: 'active'
                },
                technologies: ['Angular 17', 'TypeScript', 'Google Apps Script', 'Google Workspace'],
                description: 'Angular-приложение, интегрированное с Google Apps Script, автоматизирует ежедневный свод в Google Sheets и отправляет структурированные отчёты команде.',
                image: 'assets/projects/daily-reporter-cover.svg',
                links: {
                    code: {
                        state: 'private'
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
                title: 'Scriptagher',
                status: {
                    level: 'active'
                },
                technologies: ['SQLite', 'Dart', 'Flutter', 'Angular'],
                description: 'Гибридная экосистема автоматизации с офлайн-приложением на Flutter и SQLite и Angular-панелью для публикации повторно используемых сценариев.',
                image: 'assets/projects/scriptagher-cover.svg',
                links: {
                    code: {
                        state: 'unavailable'
                    },
                    site: {
                        state: 'available',
                        url: 'https://diegofcj.github.io/scriptagher/'
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
