import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    room_id: Number,
    room_type: String,
    description: String,
    // photos: {
    //     type: [String],
    //     required: true,
    // },
    photos: [String],
    offer: {
        type: Boolean,
        required: true,
    },
    price: Number,
    discount: Number,
    cancellation_policy : String,
    amenities: String,
});

export const Room = mongoose.model("Room", RoomSchema)