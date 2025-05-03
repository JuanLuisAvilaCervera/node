import mongoose, { Schema } from "mongoose";
import { TankInterface } from "../interfaces/tankInterface";


const TankSchema = new Schema<TankInterface>({
    size: String
});

export const Tank = mongoose.model("Tank", TankSchema)