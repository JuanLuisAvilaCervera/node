import { ContactInterface } from "../interfaces/contactInterface"
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { ContactService } from "../services/contactService";

export const  contactValidator = (req : Request, res: Response) => {
    const {
        contact_id , 
        client_id,
        comment_date,
        subject,
        comment,
        archived
    } = req.body as ContactInterface;

    
    if(typeof contact_id !== "number"){
        return "Contact Id must be a number"
    }

    if(typeof client_id !== "number"){
        return "Client Id must be a number"
    }


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

export const contactExists = (id : string | number) =>{
    if(IdValidator(id)){
        const contactService = new ContactService();
        if(typeof id !== "number"){
            return contactService.fetchById(parseInt(id))
        }else{
            return contactService.fetchById(id)
        }
        
    }else{
        return "Id incorrecto"
    }
}

export const UpdatecontactValidator = (req : Request, res : Response) => {
    // return (contactValidator(req, res) && contactExists(req, res))
    return(contactValidator(req , res) === "Correct" && contactExists(req.body.contact_id) !== "Id incorrecto")
        
}