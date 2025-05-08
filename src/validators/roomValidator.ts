
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { RoomService } from "../services/roomService";
import { RoomInterface } from "../interfaces/roomInterface";

export const  RoomValidator = (req : Request, res: Response) => {
    const {
        room_number,
        // room_type, 
        description, 
        // photos, 
        offer, 
        price, 
        discount, 
        cancellation_policy,
        amenities
    } = req.body as RoomInterface;

    // if(typeof room_type !== "string"){
    //     return "Room type must be a string"
    // }

    if(typeof description !== "string"){
        return "Description must be a string"
    }

    // if(photos != null){
    //     return"Photos must be null"
    // }

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

    //PHOTOS

    return "Correct";

    
}

