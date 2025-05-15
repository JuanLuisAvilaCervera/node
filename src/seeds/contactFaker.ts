import mongoose from "mongoose";
import express from "express";
import { json } from "body-parser";
import { ContactInterface } from "../interfaces/contactInterface";
import { createNewContact } from "./seed";
import { Contact } from "../models/contactSchema";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('miranda-database', 'root', process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

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

const checkDate = ( date : string | Date) =>{
    return new Date(date);
}

const generateContacts = (num : number) => {
    const fakedContacts : ContactInterface[] = [];
  
    for (let i = 0; i < num; i++) {
        let fakeContact : ContactInterface = createNewContact();

        let date = checkDate(fakeContact.comment_date)

        sequelize.query(`INSERT INTO contact (comment ,  subject , archived ,comment_date , idclient) VALUES ('${fakeContact.comment}','${fakeContact.subject}',${fakeContact.archived},'${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}' ,  3)`)
    }
  sequelize.query('SELECT * FROM contact')
            .then( () => console.log("Data inserted"));
    return fakedContacts;
};

Contact.insertMany(generateContacts(30)).then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));