import { BookingInterface } from "../interfaces/bookingInterface";
import { Booking } from "../models/bookingSchema";

export class BookingService{

    async fetchAll(){
        return Booking.find()
    }

    public async fetchById(id : number){
        return Booking.findOne({booking_id : id})
    }

    async create(booking : BookingInterface){
        return Booking.create(booking);
    }

    async update(updatedBooking : BookingInterface){
        return Booking.updateOne({booking_id : updatedBooking.booking_id}, {
            client : updatedBooking.client,
            room : updatedBooking.room,
            check_in_date : updatedBooking.check_in_date,
            check_out_date : updatedBooking.check_out_date,
            status : updatedBooking.status,
            special_request : updatedBooking.special_request,
        })
    }
    

    async deleteId(id : number){
        return Booking.deleteOne({booking_id : id})
    }


}