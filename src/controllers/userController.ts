import {Request , Response, Router} from 'express';
import Users from '../data/Users.json'
import { UserService } from '../services/userService';
import { UpdateUserValidator, UserExists, UserValidator } from '../validators/userValidator';
import { IdValidator } from '../validators/idValidator';

import bodyParser from 'body-parser';

export const usersRouter = Router();
const userService = new UserService();

const jsonParser = bodyParser.json();

usersRouter.get('/', async(req : Request , res: Response)=> {
    const userList = await userService.fetchAll();
    return res.status(200).json(userList)
})

usersRouter.get('/:id', async(req : Request , res: Response)=> {

    if(IdValidator(req.params.id)){
        const user = await userService.fetchById(parseInt(req.params.id));
        return res.status(200).json(user)
    }else{

    }
    
})

usersRouter.post('/create', jsonParser , async(req : Request , res: Response) => {

    if(UserValidator(req, res) && await UserExists(req.body.user_id)){
        await userService.create(req.body);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json({message: "User does not exist, or created User is not valid"})
    }

})

usersRouter.put('/update', jsonParser , async(req :Request , res : Response) => {

    if(await UpdateUserValidator(req, res)){
        const updatedUser = await userService.update(req.body);
        return res.status(202).json(updatedUser);
    }else{
        return res.status(400).json({message: "User does not exist or updated User is not valid"})
    }
})

usersRouter.delete('/delete/:id', jsonParser , async(req : Request , res : Response)  => {

    if(await UserExists(req.params.id)){

        const remainingList = typeof req.params.id !== "number" ? await userService.deleteId(parseInt(req.params.id)) : await userService.deleteId(req.params.id);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "User does not exist"})
    }
})