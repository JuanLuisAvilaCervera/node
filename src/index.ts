import express , {Request , Response} from "express";
import { usersRouter } from "./controllers/userController";
import { contactsRouter } from "./controllers/contactController";

const app = express();

app.use("/users", usersRouter);
app.use("/contacts", contactsRouter)

app.listen(3000 , () => {
    console.log("Server is running")
})