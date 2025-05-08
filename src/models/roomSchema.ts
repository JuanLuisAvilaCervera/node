import mongoose from "mongoose";
import { RoomInterface } from "../interfaces/roomInterface";

const RoomSchema = new mongoose.Schema<RoomInterface>({
    room_number: Number,
    description: String,
    offer: Boolean,
    price: Number,
    discount: Number,
    cancellation_policy : String,
    amenities: String,
});

export const Room = mongoose.model("Room", RoomSchema)

// photos: {
    //     type: [String]
    // },

    // room_type: {
    //     type: String,
    //     enum: ['Single Bed' , 'Double Bed' , 'Double Superior' , 'Suite']
    // },