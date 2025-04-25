import {Request , Response, Router} from 'express';
import Rooms from '../data/Rooms.json'
import { RoomService } from '../services/roomService';
import { UpdateRoomValidator, RoomExists, RoomValidator } from '../validators/roomValidator';
import { IdValidator } from '../validators/idValidator';


import bodyParser from 'body-parser';


export const roomsRouter = Router();
const roomService = new RoomService();

const jsonParser = bodyParser.json();

roomsRouter.get('/', async(req : Request , res: Response) : Promise<any>=> {
    const roomList = await roomService.fetchAll();
    return res.status(200).json(roomList)
})

roomsRouter.get('/:id', async(req : Request , res: Response) : Promise<any>=> {

    if(IdValidator(req.params.id)){
        const room = await roomService.fetchById(parseInt(req.params.id));
        return res.status(200).json(room)
    }else{

    }
    
})

roomsRouter.post('/create', jsonParser , async(req : Request , res: Response) : Promise<any> => {

    if(RoomValidator(req, res) && RoomExists(req.body.room_id) === "Id incorrecto"){
        await roomService.create(req.body);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json({message: "No funciona"}) // Cambiar comentarios
    }

})

roomsRouter.put('/update', jsonParser , async(req :Request , res : Response) : Promise<any> => {

    if(UpdateRoomValidator(req, res)){
        const updatedRoom = await roomService.update(req.body);
        if(updatedRoom !== "Usuario no existente"){
            return res.status(202).json(updatedRoom);
        }else{
            return res.status(400).json({ message: "Usuario no existente"})
        }
        

    }else{
        return res.status(400).json({message: "No funciona"})
    }
})

roomsRouter.delete('/delete/:id', jsonParser , async(req : Request , res : Response) : Promise<any> => {

    if(RoomExists(req.params.id) !== "Id incorrecto"){

        const remainingList = typeof req.params.id !== "number" ? await roomService.deleteId(parseInt(req.params.id)) : await roomService.deleteId(req.params.id);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "Id no existente"})
    }
})