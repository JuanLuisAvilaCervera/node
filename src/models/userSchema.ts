import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    photo: String,
    start_date: Date,
    email: String,
    job_description: String,
    contact: String,
    active: Boolean,
});

export const User = mongoose.model("User", UserSchema)