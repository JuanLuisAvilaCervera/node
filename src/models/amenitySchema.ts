import mongoose from "mongoose";
import { AmenityInterface } from "../interfaces/amenityInterface";

const AmenitySchema = new mongoose.Schema<AmenityInterface>({
    name : String,
    description : String
});

export const Amenity = mongoose.model("Amenity", AmenitySchema)