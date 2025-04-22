import {Request , Response, Router} from 'express';
import Users from '../data/Users.json'
import { UserService } from '../services/userService';
import { UpdateUserValidator, UserExists, UserValidator } from '../validators/userValidator';
import { IdValidator } from '../validators/idValidator';

export const usersRouter = Router();
const userService = new UserService();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

usersRouter.get('/', async(req : Request , res: Response) => {
    const userList = await userService.fetchAll();
    return res.status(200).json(userList)
})

usersRouter.get('/:id', async(req : Request , res: Response) => {

    if(IdValidator(req.params.id)){
        const user = await userService.fetchById(parseInt(req.params.id));
        return res.status(200).json(user)
    }else{

    }
    
})

usersRouter.post('/create', jsonParser , async(req : Request , res: Response) => {

    if(UserValidator(req, res) && UserExists(req.body.user_id) === "Id incorrecto"){
        await userService.create(req);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json("No funciona")
    }

})

usersRouter.put('/update', jsonParser , async(req :Request , res : Response) => {

    if(UpdateUserValidator(req, res)){
        const updatedUser = await userService.update(req.body);
        if(updatedUser !== "Usuario no existente"){
            return res.status(202).json(updatedUser);
        }else{
            return res.status(400).json("Usuario no existente")
        }
        

    }else{
        return res.status(400).json("No funciona")
    }
})