import { BookingInterface } from "../interfaces/bookingInterface";
import { Request , Response} from "express";
import { IdValidator } from "./idValidator";
import { BookingService } from "../services/bookingService";

export const  BookingValidator = (req : Request, res: Response) => {
    const {
        booking_id,
        client_id,
        room_id,
        order_date,
        check_in_date,
        check_out_date,
        status,
        special_request
    } = req.body as BookingInterface;

    
    if(typeof booking_id !== "number"){
        return "Booking Id must be a number"
    }

    if(typeof client_id !== "number"){
        return "First name must be a string"
    }

    if(typeof room_id !== "number"){
        return "Last name must be a string"
    }
    
    // if( Object.prototype.toString.call(start_date) === '[object Date]'){
    //     return  "Start date must be a Date"
    // }

    if(typeof order_date !== "string"){
        return"Order date must be a string"
    }
    if(typeof check_in_date !== "string"){
        return"Check in date must be a string"
    }
    if(typeof order_date !== "string"){
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

export const  BookingExists = async (id : string | number) =>{ 
    if(IdValidator(id)){
        const bookingService = new BookingService();
        if(typeof id !== "number"){
            return await  bookingService.fetchById(parseInt(id)) !== -1;
        }else{
            return await bookingService.fetchById(id) !== -1;
        }
        
    }else{
        return false
    }
}