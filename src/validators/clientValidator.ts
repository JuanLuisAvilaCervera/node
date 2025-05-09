import { ClientInterface } from "../interfaces/clientInterface"
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { ClientService } from "../services/clientService";

export const  ClientValidator = (req : Request, res: Response) => {
    const {
        first_name, 
        last_name, 
        phone,
        email,
    } = req.body as ClientInterface;


    if(typeof first_name !== "string"){
        return "First name must be a string"
    }

    if(typeof last_name !== "string"){
        return "Last name must be a string"
    }

    if( typeof email !== "string"){
        return  "Email must be a string"
    }

    if( typeof phone !== "string"){
        return "Phone must be a string"
    }

    return "Correct";   
}

export const ClientExists = async (email : string) =>{
    if(IdValidator(email)){
        const clientService = new ClientService();
        return await clientService.fetchOne(email)
    }else{
        return null
    }
}

export const UpdateClientValidator = async (req : Request, res : Response) => {
    return(ClientValidator(req , res) === "Correct" && await ClientExists(req.body.email) !== null)
}