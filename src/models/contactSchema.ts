import mongoose from "mongoose";
import { ContactInterface } from "../interfaces/contactInterface";
import { ClientInterface } from "../interfaces/clientInterface";

const ContactSchema = new mongoose.Schema<ContactInterface>({
    comment_date: String,
    subject: String,
    comment: String,
    archived: Boolean,
    idclient: Number,
});

export const Contact = mongoose.model("Contact", ContactSchema)