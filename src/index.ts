import express , { RequestHandler} from "express";
import { usersRouter } from "./controllers/userController";
import { contactsRouter } from "./controllers/contactController";
import { roomsRouter } from "./controllers/roomController";
import { bookingsRouter } from "./controllers/bookingController";
import { authenticateToken } from "./middleware/auth";
import ServerlessHttp from "serverless-http";

declare module 'express' {
    export interface Request {
        user: string;
    }
}

const app = express();

app.use(authenticateToken as RequestHandler);

const handler = ServerlessHttp(app, { provider: 'azure' });
module.exports.funcName = async (context : any, req : Request) => {
  context.res = await handler(context, req);
}


app.use("/users", usersRouter);
app.use("/contacts", contactsRouter)
app.use("/rooms", roomsRouter)
app.use("/bookings", bookingsRouter)

app.listen(3000 , () => {
    console.log("Server is running")
})