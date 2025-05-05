import { Request , Response, Router} from 'express';
import { RoomService } from '../services/roomService';
import { RoomValidator } from '../validators/roomValidator';
import { IdValidator } from '../validators/idValidator';


import bodyParser from 'body-parser';


export const roomsRouter = Router();

const jsonParser = bodyParser.json();


roomsRouter.get('/', (req: Request, res : Response) => {
    const roomService = new RoomService();
    const roomList = roomService.fetchAll();
    res.status(200).json(roomList);
});


roomsRouter.get('/:id', async(req : Request , res: Response)=> {
    if(IdValidator(req.params.room_id)){
        const roomService = new RoomService();
        const room = await roomService.fetchById(parseInt(req.params.id));
        return res.status(200).json(room)
    }else{
        return res.status(400).json({message: "Room Id not valid"})
    }
    //CAMBIAR A DENTRO DE SERVICE
    
})

roomsRouter.post('/', jsonParser , async(req : Request , res: Response) : Promise<any> => {
    const roomService = new RoomService();

    if(RoomValidator(req, res) && roomService.RoomExists(req.body.room_id) === "Id incorrecto"){
        await roomService.create(req.body);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json({message: "No funciona"}) // Cambiar comentarios
    }

})

roomsRouter.put('/', jsonParser , async(req :Request , res : Response) : Promise<any> => {
    const roomService = new RoomService();
        const updatedRoom = await roomService.update(req.body);
        if(updatedRoom !== null){
            return res.status(202).json(updatedRoom);
        }else{
            return res.status(400).json({ message: "Usuario no existente"})
        }
})

roomsRouter.delete('/:number', jsonParser , async(req : Request , res : Response) : Promise<any> => {
    const roomService = new RoomService();
    if(roomService.RoomExists(req.params.number) !== "Id incorrecto"){

        const remainingList = typeof req.params.id !== "number" ? await roomService.deleteId(parseInt(req.params.id)) : await roomService.deleteId(req.params.id);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "Id no existente"})
    }
})