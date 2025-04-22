import express , {Request , Response} from "express";
import { usersRouter } from "./controllers/userController";

const app = express();

app.use("/users", usersRouter);

app.listen(3000 , () => {
    console.log("Server is running")
})