import mongoose from "mongoose";
import { RoomInterface } from "../interfaces/roomInterface";

const RoomSchema = new mongoose.Schema<RoomInterface>({
    room_number: Number,
    room_type: String,
    description: String,
    photos: [String],
    offer: Boolean,
    price: Number,
    discount: Number,
    cancellation_policy : String,
    amenities: String,
});

export const Room = mongoose.model("Room", RoomSchema)