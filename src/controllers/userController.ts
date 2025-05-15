import {Request , Response, Router} from 'express';
import Users from '../data/Users.json'
import { UserService } from '../services/userService';
import {UserExists, UserValidator } from '../validators/userValidator';
import { IdValidator } from '../validators/idValidator';

import bodyParser from 'body-parser';


export const usersRouter = Router();
const userService = new UserService();

const jsonParser = bodyParser.json();

usersRouter.get('/', async(req : Request , res: Response)=> {
    const userList = await userService.fetchAll();
    res.status(200).json(userList)
})

usersRouter.get('/:email', async(req : Request , res: Response)=> {

    const user = await userService.fetchOne(req.params.email);
    if(user !== null){
        return res.status(200).json(user)
    }else{
        return res.status(404).json({message: "User not found"})
    }
    
    
})

usersRouter.post('/', jsonParser , async(req : Request , res: Response) => {

    if(UserValidator(req, res)){
        const created = await userService.create(req.body);
        return res.status(201).json(created);
    }else{
        return res.status(400).json({message: "Not valid user"})
    }

})

usersRouter.put('/:email', jsonParser , async(req :Request , res : Response)=> {

    console.log(UserExists(req.params.email) !== null)
    if(UserExists(req.params.email) !== null){

        const updatedUser =  await userService.update(req.params.email, req.body);
    
        return res.status(202).json(updatedUser);
    }else{
        return  res.status(400).json({message: "User does not exist"})
    }
})

usersRouter.delete('/:email', jsonParser , async(req : Request , res : Response) => {

    if(UserExists(req.params.email) !== null){

        const remainingList =  await userService.deleteOne(req.params.email);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "User does not exist"})
    }
})