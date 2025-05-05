import { ClientInterface } from "./clientInterface";

interface ContactInterface {
    client : ClientInterface,
    comment_date: string;
    subject: string;
    comment: string;
    archived: boolean;
}

export {ContactInterface}