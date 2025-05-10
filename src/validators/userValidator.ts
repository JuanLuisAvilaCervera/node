import { UserInterface } from "../interfaces/userInterface"
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { UserService } from "../services/userService";

export const  UserValidator = (req : Request, res: Response) => {
    const {
        first_name, 
        last_name, 
        photo, 
        start_date, 
        email, 
        job_description, 
        contact,
        active
    } = req.body as UserInterface;


    if(typeof first_name !== "string"){
        return "First name must be a string"
    }

    if(typeof last_name !== "string"){
        return "Last name must be a string"
    }

    if(typeof photo !== "string"){
        return"Photo must be a string"
    }

    if( Object.prototype.toString.call(start_date) !== '[object Date]'){
        return  "Start date must be a Date"
    }

    if( typeof email !== "string"){
        return  "Email must be a string"
    }

    if( typeof job_description !== "string"){
        return  "Job Description must be a string"
    }

    if( typeof contact !== "string"){
        return  "Contact must be a String"
    }

    if( typeof active !== "boolean"){
        return  "Active must be boolean"
    }

    return "Correct";

    
}

export const UserExists = async (email : string) =>{
    if(IdValidator(email)){
        const userService = new UserService();
        return await userService.fetchOne(email)
    }else{
        return null
    }
}
