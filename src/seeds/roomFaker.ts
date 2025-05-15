import mongoose from "mongoose";
import express from "express";
import { json } from "body-parser";
import { createNewRoom, createNewUser } from "./seed";
import { RoomInterface } from "../interfaces/roomInterface";
import { Room } from "../models/roomSchema";
import { SequelizeMethod } from "sequelize/lib/utils";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('miranda-database', 'root', process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});



declare module 'express' {
    export interface Request {
        user: string;
    }
}
const app = express();

app.use(json());


const generateRooms = (num : number) => {
    const fakedRooms : RoomInterface[] = [];
  
    for (let i = 0; i < num; i++) {
      let fakeRoom : RoomInterface = createNewRoom();
      sequelize.query(`INSERT INTO room (room_number , description , offer , price , discount , cancellation_policy , photos , room_type) VALUES (${fakeRoom.room_number} , '${fakeRoom.description}', ${fakeRoom.offer}, ${fakeRoom.price}, ${fakeRoom.discount}, '${fakeRoom.cancellation_policy}', '${JSON.stringify(fakeRoom.photos)}', '${fakeRoom.room_type}')`)
    }
    sequelize.query('SELECT * FROM room')
        .then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));
  
    return fakedRooms;
};

Room.insertMany(generateRooms(30)).then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));