import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_id: Number,
    first_name: String,
    last_name: String,
    photo: String,
    start_date: String,
    email: String,
    job_description: String,
    contact: String,
    active: Boolean,
});

export const User = mongoose.model("User", UserSchema, "User")