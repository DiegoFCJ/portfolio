export interface ContactMeLangs {
    en: ContactMe;
    it?: ContactMe;
    de?: ContactMe;
    es?: ContactMe;
    [key: string]: ContactMe | undefined;
}

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
