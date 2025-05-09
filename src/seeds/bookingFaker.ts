import mongoose from "mongoose";
import express from "express";
import { json } from "body-parser";
import { BookingInterface } from "../interfaces/bookingInterface";
import { Booking } from "../models/bookingSchema";
import { createNewBooking } from "./seed";


declare module 'express' {
    export interface Request {
        booking: string;
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

const generateBookings = (num : number) => {
    const fakedBookings = [];
  
    for (let i = 0; i < num; i++) {
      let fakeBooking : BookingInterface = createNewBooking();
  
      fakedBookings.push(fakeBooking);
    }
  
    return fakedBookings;
};


Booking.insertMany(generateBookings(30)).then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));