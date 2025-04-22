import { UserInterface } from "../interfaces/userInterface"
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { UserService } from "../services/userService";

export const  UserValidator = (req : Request, res: Response) => {
    const {
        user_id , 
        first_name, 
        last_name, 
        photo, 
        start_date, 
        email, 
        job_description, 
        contact,
        active
    } = req.body as UserInterface;

    
    if(typeof user_id !== "number"){
        return "User Id must be a number"
    }

    if(typeof first_name !== "string"){
        return "First name must be a string"
    }

    if(typeof last_name !== "string"){
        return "Last name must be a string"
    }

    if(typeof photo !== "string"){
        return"Photo must be a string"
    }

    // if( Object.prototype.toString.call(start_date) === '[object Date]'){
    //     return  "Start date must be a Date"
    // }
    if( typeof start_date !== "string"){
        return  "Start date must be a Date"
    }

    return "Correct";

    
}

export const UserExists = (id : string | number) =>{
    if(IdValidator(id)){
        const userService = new UserService();
        if(typeof id !== "number"){
            return userService.fetchById(parseInt(id))
        }else{
            return userService.fetchById(id)
        }
        
    }else{
        return "Id incorrecto"
    }
}

export const UpdateUserValidator = (req : Request, res : Response) => {
    // return (UserValidator(req, res) && UserExists(req, res))
    return(UserValidator(req , res) === "Correct" && UserExists(req.body.user_id) !== "Id incorrecto")
        
}