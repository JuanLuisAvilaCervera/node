import { ContactInterface } from "../interfaces/contactInterface"
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { ContactService } from "../services/contactService";

export const  contactValidator = (req : Request, res: Response) => {
    const {
        comment_date,
        subject,
        comment,
        archived,
    } = req.body as ContactInterface;
    // if( Object.prototype.toString.call(comment_date) === '[object Date]'){
    //     return  "Comment date must be a Date"
    // }

    if(typeof comment_date !== "string"){
        return "Comment Date must be a string"
    }

    if(typeof subject !== "string"){
        return "Subject must be a string"
    }

    if(typeof comment !== "string"){
        return"Comment must be a string"
    }

    if(typeof archived !== "boolean"){
        return "Archived must be a boolean"
    }

    return "Correct";
}
