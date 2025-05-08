import mongoose from "mongoose";
import { Room } from "./roomSchema";

const BookingSchema = new mongoose.Schema({
    order_date: Date,
    check_in_date: Date,
    check_out_date: Date,
    status: String,
    special_request: String,
    // room: {
    //     room_number: Number,
    //     room_type: String,
    //     description: String,
    //     photos: [String],
    //     offer: Boolean,
    //     price: Number,
    //     discount: Number,
    //     cancellation_policy : String,
    //     amenities: String,
    // },
    // client : {
    //     first_name : String,
    //     last_name : String,
    //     phone : String,
    //     email : String,
    // }
});

export const Booking = mongoose.model("Booking", BookingSchema)