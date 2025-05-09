import { BookingInterface } from "../interfaces/bookingInterface";
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { BookingService } from "../services/bookingService";

export const  BookingValidator = (req : Request, res: Response) => {
    const {
        order_date,
        check_in_date,
        check_out_date,
        status,
        special_request
    } = req.body as BookingInterface;

    // if( Object.prototype.toString.call(start_date) === '[object Date]'){
    //     return  "Start date must be a Date"
    // }

    if(typeof order_date !== "string"){
        return"Order date must be a string"
    }
    if(typeof check_in_date !== "string"){
        return"Check in date must be a string"
    }
    if(typeof check_out_date !== "string"){
        return"Check out date must be a string"
    }

    if( typeof status !== "string"){
        return  "status must be a Date"
    }

    if(typeof special_request !== "string"){
        return"Special request must be a string"
    }

    return "Correct";

    
}

