import mongoose from "mongoose";
import { ClientInterface } from "../interfaces/clientInterface";

const ClientSchema = new mongoose.Schema<ClientInterface>({
    first_name : String,
    last_name : String,
    phone : String,
    email : String,
});

export const Client = mongoose.model("Client", ClientSchema)