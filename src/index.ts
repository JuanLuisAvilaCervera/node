import express , {Request , Response} from "express";
import { usersRouter } from "./controllers/userController";
import { contactsRouter } from "./controllers/contactController";
import { roomsRouter } from "./controllers/roomController";
import { bookingsRouter } from "./controllers/bookingController";
import { loginRouter } from "./middleware/auth";



const app = express();

app.use("/users", usersRouter);
app.use("/contacts", contactsRouter)
app.use("/rooms", roomsRouter)
app.use("/bookings", bookingsRouter)
app.use("/login", loginRouter)

app.listen(3000 , () => {
    console.log("Server is running")
})