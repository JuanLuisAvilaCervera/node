import mongoose from "mongoose";
import express from "express";
import { json } from "body-parser";
import { createNewUser } from "./seed";
import { UserInterface } from "../interfaces/userInterface";
import { User } from "../models/userSchema";


declare module 'express' {
    export interface Request {
        user: string;
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

const generateUsers = (num : number) => {
    const fakedUsers = [];
  
    for (let i = 0; i < num; i++) {
      let fakeUser : UserInterface = createNewUser();
  
      fakedUsers.push(fakeUser);
    }
  
    return fakedUsers;
};

User.insertMany(generateUsers(30));