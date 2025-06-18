import mongoose from "mongoose";
import express from "express";
import { json } from "body-parser";
import { ContactInterface } from "../interfaces/contactInterface";
import { createNewContact } from "./seed";
import { Contact } from "../models/contactSchema";

declare module 'express' {
    export interface Request {
        contact: string;
    }
}

const app = express();

app.use(json());

const start = async () => {
    try{
        await mongoose.connect(
            "mongodb+srv://juanluisavilacervera44:GV9nXFY1kI9mGi9R@mirandacluster.gsus0k2.mongodb.net/"
        )
    } catch (error){

        console.error("error mongo: " , error);
        process.exit(1);
    }
}
start();

const generateContacts = (num : number) => {
    const fakedContacts = [];
  
    for (let i = 0; i < num; i++) {
      let fakeContact : ContactInterface = createNewContact();
  
      fakedContacts.push(fakeContact);
    }
  
    return fakedContacts;
};

Contact.insertMany(generateContacts(30)).then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));