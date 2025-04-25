
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { RoomService } from "../services/roomService";
import { RoomInterface } from "../interfaces/roomInterface";

export const  RoomValidator = (req : Request, res: Response) => {
    const {
        room_id , 
        room_type, 
        description, 
        photos, 
        offer, 
        price, 
        discount, 
        cancellation_policy,
        amenities
    } = req.body as RoomInterface;

    
    if(typeof room_id !== "number"){
        return "Room Id must be a number"
    }

    if(typeof room_type !== "string"){
        return "Room type must be a string"
    }

    if(typeof description !== "string"){
        return "Description must be a string"
    }

    if(photos != null){
        return"Photos must be null"
    }

    if( typeof offer !== "boolean"){
        return  "Offer must be a boolean"
    }

    if( typeof price !== "number"){
        return  "Price must be a number"
    }

    if( typeof discount !== "number"){
        return  "Discount must be a number"
    }

    if( typeof cancellation_policy !== "string"){
        return  "Cancellation policy must be a string"
    }

    if( typeof amenities !== "string"){
        return  "Amenities must be a string"
    }

    return "Correct";

    
}

export const RoomExists = (id : string | number) =>{ // devolver booleano, cambiar a service
    if(IdValidator(id)){
        const userService = new RoomService();
        if(typeof id !== "number"){
            return userService.fetchById(parseInt(id)) 
        }else{
            return userService.fetchById(id)
        }
        
    }else{
        return "Id incorrecto"
    }
}

export const UpdateRoomValidator = (req : Request, res : Response) => {
    return(RoomValidator(req , res) === "Correct" && RoomExists(req.body.user_id) !== "Id incorrecto")
}