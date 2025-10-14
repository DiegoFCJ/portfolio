import { LanguageCode } from '../models/language-code.type';

export type ContactMeLangs = Partial<Record<LanguageCode, ContactMe>>;

export interface ContactMe {
    title: string;
    name: string;
    nameReq: string;
    email: string;
    emailReq: string;
    message: string;
    messageReq: string;
    sendBtn: string;
    emailMessages: EmailMessages[];
}

export interface EmailMessages {
    keyMess: string;
    valueMess: string;
}
