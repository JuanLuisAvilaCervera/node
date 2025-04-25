import { BookingInterface } from "../interfaces/bookingInterface";
import { BookingValidator } from "../validators/bookingValidator";
import Bookings from "../data/Bookings.json"

export class BookingService{

    private bookingList : BookingInterface[] = [];

    constructor() {
        this.bookingList = [...Bookings];
    }

    async fetchAll(){
        return this.bookingList;
    }

    public async fetchById(id : number){
        const bookingFetchedArray = this.bookingList.filter((booking) => booking.booking_id === id)
        return bookingFetchedArray.length > 0 ? this.bookingList.filter((booking) => booking.booking_id === id)[0] : "Usuario no existente";

    }

    async create(booking : BookingInterface){
        this.bookingList.push(booking)
        return booking;
    }

    async update(updatedBooking : BookingInterface){

        const oldBooking = await this.fetchById(updatedBooking.booking_id);

        if( oldBooking !== "Usuario no existente"){
            
            oldBooking.client_id = updatedBooking.client_id;
            oldBooking.room_id = updatedBooking.room_id;
            oldBooking.order_date = updatedBooking.order_date;
            oldBooking.check_in_date = updatedBooking.check_in_date;
            oldBooking.check_out_date = updatedBooking.check_out_date;
            oldBooking.status = updatedBooking.status;
            oldBooking.special_request = updatedBooking.special_request;
            return oldBooking;
        }else{
            return "Usuario no existente"
        }
    }
    

    async deleteId(id : number){
        console.log(id)
        const deletedBooking = this.bookingList.filter((booking) => booking.booking_id === id);
        console.log(deletedBooking[0])
        this.bookingList = this.bookingList.filter((booking) => booking.booking_id !== id )
        return this.bookingList
    }


}