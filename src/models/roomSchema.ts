import mongoose from "mongoose";
import { RoomInterface } from "../interfaces/roomInterface";



const RoomSchema = new mongoose.Schema<RoomInterface>({
    room_number: Number,
    description: String,
    offer: Boolean,
    price: Number,
    discount: Number,
    cancellation_policy : String,
    room_type: String,
    photos: [String]
});

export const Room = mongoose.model("Room", RoomSchema)
