import express, { Request, Response } from "express";

var roomRouter = express.Router();

/* GET users listing. */
roomRouter.get('/', (req : Request, res : Response) => {

    const rooms = [{name : "Room 1"},{name : "Room 2"},{name : "Room 3"}]
    res.status(200);
    res.json(rooms);
});

roomRouter.post("/", (req : Request , res: Response) => {
    const rooms = [{name : "Room 1"},{name : "Room 2"},{name : "Room 3"}]
    res.status(201);
    res.json(rooms);
})

module.exports = roomRouter;
