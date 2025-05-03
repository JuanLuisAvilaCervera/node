import express , { RequestHandler} from "express";
import { usersRouter } from "./controllers/userController";
import { contactsRouter } from "./controllers/contactController";
import { roomsRouter } from "./controllers/roomController";
import { bookingsRouter } from "./controllers/bookingController";
import { authenticateToken } from "./middleware/auth";

declare module 'express' {
    export interface Request {
        user: string;
    }
}

const app = express();


// app.use(authenticateToken as RequestHandler);

app.use("/users", usersRouter);
app.use("/contacts", contactsRouter)
app.use("/rooms", roomsRouter)
app.use("/bookings", bookingsRouter)

app.listen(3000 , () => {
    console.log("Server is running")
})