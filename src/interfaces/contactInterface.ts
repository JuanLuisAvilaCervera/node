import { ClientInterface } from "./clientInterface";

interface ContactInterface {
    idclient : number;
    comment_date: Date;
    subject: string;
    comment: string;
    archived: boolean;
}

export {ContactInterface}