import mongoose from "mongoose";
import express from "express";
import { json } from "body-parser";
import { createNewRoom, createNewUser } from "./seed";
import { RoomInterface } from "../interfaces/roomInterface";
import { Room } from "../models/roomSchema";


declare module 'express' {
    export interface Request {
        room: string;
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

const generateRooms = (num : number) => {
    const fakedRooms = [];
  
    for (let i = 0; i < num; i++) {
      let fakeRoom : RoomInterface = createNewRoom();
  
      fakedRooms.push(fakeRoom);
    }
  
    return fakedRooms;
};

Room.insertMany(generateRooms(30)).then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));