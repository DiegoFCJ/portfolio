import { Social } from '../dtos/SocialDTO';
import { LanguageCode } from '../models/language-code.type';

export type SocialsByLanguage = Partial<Record<LanguageCode, Social[]>>;

export const socialsByLanguage: SocialsByLanguage = {
    it: [
        {
            link: 'https://linkedin.com/in/diegofois/',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
            label: 'Profilo LinkedIn'
        },
        {
            link: 'https://github.com/DiegoFCJ',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
            label: 'Profilo GitHub'
        },
        {
            link: 'https://discord.gg/9p7U3pcW4T',
            icon: 'assets/icons/discord.svg',
            label: 'Unisciti al server Discord'
        },
        {
            link: 'mailto:diegoeffe96@gmail.com',
            icon: 'assets/icons/mail.svg',
            label: 'Invia una email a diegoeffe96@gmail.com'
        }
    ],
    en: [
        {
            link: 'https://linkedin.com/in/diegofois/',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
            label: 'LinkedIn Profile'
        },
        {
            link: 'https://github.com/DiegoFCJ',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
            label: 'GitHub Profile'
        },
        {
            link: 'https://discord.gg/9p7U3pcW4T',
            icon: 'assets/icons/discord.svg',
            label: 'Join the Discord server'
        },
        {
            link: 'mailto:diegoeffe96@gmail.com',
            icon: 'assets/icons/mail.svg',
            label: 'Send an email to diegoeffe96@gmail.com'
        }
    ],
    es: [
        {
            link: 'https://linkedin.com/in/diegofois/',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
            label: 'Perfil de LinkedIn'
        },
        {
            link: 'https://github.com/DiegoFCJ',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
            label: 'Perfil de GitHub'
        },
        {
            link: 'https://discord.gg/9p7U3pcW4T',
            icon: 'assets/icons/discord.svg',
            label: 'Únete al servidor de Discord'
        },
        {
            link: 'mailto:diegoeffe96@gmail.com',
            icon: 'assets/icons/mail.svg',
            label: 'Enviar un correo a diegoeffe96@gmail.com'
        }
    ],
    de: [
        {
            link: 'https://linkedin.com/in/diegofois/',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
            label: 'LinkedIn-Profil'
        },
        {
            link: 'https://github.com/DiegoFCJ',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
            label: 'GitHub-Profil'
        },
        {
            link: 'https://discord.gg/9p7U3pcW4T',
            icon: 'assets/icons/discord.svg',
            label: 'Tritt dem Discord-Server bei'
        },
        {
            link: 'mailto:diegoeffe96@gmail.com',
            icon: 'assets/icons/mail.svg',
            label: 'Sende eine E-Mail an diegoeffe96@gmail.com'
        }
    ],
    no: [
        {
            link: 'https://linkedin.com/in/diegofois/',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
            label: 'LinkedIn-profil'
        },
        {
            link: 'https://github.com/DiegoFCJ',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
            label: 'GitHub-profil'
        },
        {
            link: 'https://discord.gg/9p7U3pcW4T',
            icon: 'assets/icons/discord.svg',
            label: 'Bli med på Discord-serveren'
        },
        {
            link: 'mailto:diegoeffe96@gmail.com',
            icon: 'assets/icons/mail.svg',
            label: 'Send en e-post til diegoeffe96@gmail.com'
        }
    ],
    ru: [
        {
            link: 'https://linkedin.com/in/diegofois/',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
            label: 'Профиль LinkedIn'
        },
        {
            link: 'https://github.com/DiegoFCJ',
            icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
            label: 'Профиль GitHub'
        },
        {
            link: 'https://discord.gg/9p7U3pcW4T',
            icon: 'assets/icons/discord.svg',
            label: 'Присоединиться к серверу Discord'
        },
        {
            link: 'mailto:diegoeffe96@gmail.com',
            icon: 'assets/icons/mail.svg',
            label: 'Отправить письмо на diegoeffe96@gmail.com'
        }
    ]
};
