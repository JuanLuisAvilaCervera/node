import express , { json, Request, RequestHandler} from "express";
import { usersRouter } from "./controllers/userController";
import { contactsRouter } from "./controllers/contactController";
import { roomsRouter } from "./controllers/roomController";
import { bookingsRouter } from "./controllers/bookingController";
import { authenticateToken } from "./middleware/auth";
import mongoose from "mongoose";
import serverless from "serverless-http";
import { loginRouter } from "./controllers/loginController";
import cors from "cors";
import 'dotenv/config';


const app = express();



const corsOrigin : string = "http://localhost:5173";

const corsOptions = {
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}

app.use(json());
app.use(cors(corsOptions));
app.use("/login", loginRouter)
// app.use("/users", authenticateToken as RequestHandler,  usersRouter);
// app.use("/contacts",authenticateToken as RequestHandler, contactsRouter);
// app.use("/rooms", authenticateToken as RequestHandler, roomsRouter);
// app.use("/bookings",authenticateToken as RequestHandler , bookingsRouter);


const start = async () => {
    try{
        await mongoose.connect(
            process.env.MONGO_URI as string
        )
    } catch (error){

        console.error("error mongo: " , error);
        process.exit(1);
    }
}
start()

app.listen(3000 , () => {
    console.log("Server is running")
})

export const handler = serverless(app)

