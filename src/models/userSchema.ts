import mongoose from "mongoose";
import { UserInterface } from "../interfaces/userInterface";

const UserSchema = new mongoose.Schema<UserInterface>({
    
    first_name: String,
    last_name: String,
    photo: String,
    start_date: String,
    email: String,
    job_description: String,
    contact: String,
    active: Boolean,
});

export const User = mongoose.model("User", UserSchema)