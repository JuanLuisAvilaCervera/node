import mongoose from "mongoose";
import { Room } from "./roomSchema";

const BookingSchema = new mongoose.Schema({
    order_date: Date,
    check_in_date: Date,
    check_out_date: Date,
    status: String,
    special_request: String,
    //Room
    //Client
});

export const Booking = mongoose.model("Booking", BookingSchema)