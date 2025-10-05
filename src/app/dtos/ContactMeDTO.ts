import { LanguageMap } from '../models/language.types';

export type ContactMeLangs = LanguageMap<ContactMe>;

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