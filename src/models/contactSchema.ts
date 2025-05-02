import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    comment_date: Date,
    subject: String,
    comment: String,
    archived: Boolean
});

export const Contact = mongoose.model("Contact", ContactSchema)