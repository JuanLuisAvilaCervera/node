import express , { json, Request, RequestHandler} from "express";
import { usersRouter } from "./controllers/userController";
import { contactsRouter } from "./controllers/contactController";
import { roomsRouter } from "./controllers/roomController";
import { bookingsRouter } from "./controllers/bookingController";
import { authenticateToken } from "./middleware/auth";
import mongoose from "mongoose";
import serverless from "serverless-http";

declare module 'express' {
    export interface Request {
        user: string;
    }
}

const app = express();

// app.use(authenticateToken as RequestHandler);

// export const handler = () => {
//     start().then( () => {
//         serverless(app)
//         app.use(json());
//         app.use("/users", usersRouter);
//         app.use("/contacts", contactsRouter)
//         app.use("/rooms", roomsRouter)
//         app.use("/bookings", bookingsRouter)
//     })
    
// } 

app.use(json());
// app.use("/login")
app.use("/users", usersRouter);
app.use("/contacts", contactsRouter)
app.use("/rooms", roomsRouter)
app.use("/bookings", bookingsRouter)


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
start()
app.listen(3000);
