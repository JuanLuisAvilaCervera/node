import {Request , Response, Router} from 'express';
import Users from '../data/Users.json'
import { UserService } from '../services/userService';
import { UpdateUserValidator, UserExists, UserValidator } from '../validators/userValidator';
import { IdValidator } from '../validators/idValidator';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

process.env.TOKEN_SECRET;

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


export const usersRouter = Router();
const userService = new UserService();

const bodyParser = require('body-parser'); // import
const jsonParser = bodyParser.json();

usersRouter.get('/', async(req : Request , res: Response) : Promise<any>=> {
    const userList = await userService.fetchAll();
    return res.status(200).json(userList)
})

usersRouter.get('/:id', async(req : Request , res: Response) : Promise<any>=> {

    if(IdValidator(req.params.id)){
        const user = await userService.fetchById(parseInt(req.params.id));
        return res.status(200).json(user)
    }else{

    }
    
})

usersRouter.post('/create', jsonParser , async(req : Request , res: Response) : Promise<any> => {

    if(UserValidator(req, res) && UserExists(req.body.user_id) === "Id incorrecto"){
        await userService.create(req.body);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json({message: "No funciona"}) // Cambiar comentarios
    }

})

usersRouter.put('/update', jsonParser , async(req :Request , res : Response) : Promise<any> => {

    if(UpdateUserValidator(req, res)){
        const updatedUser = await userService.update(req.body);
        if(updatedUser !== "Usuario no existente"){
            return res.status(202).json(updatedUser);
        }else{
            return res.status(400).json({ message: "Usuario no existente"})
        }
        

    }else{
        return res.status(400).json({message: "No funciona"})
    }
})

usersRouter.delete('/delete/:id', jsonParser , async(req : Request , res : Response) : Promise<any> => {

    if(UserExists(req.params.id) !== "Id incorrecto"){

        const remainingList = typeof req.params.id !== "number" ? await userService.deleteId(parseInt(req.params.id)) : await userService.deleteId(req.params.id);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "Id no existente"})
    }
})