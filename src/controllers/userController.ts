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
    return res.status(200).json(userList)
})

<<<<<<< HEAD
usersRouter.get('/:id', async(req : Request , res: Response)=> {
=======
usersRouter.get('/:email', async(req : Request , res: Response)=> {
>>>>>>> bccfcd03589a91f78c3dd60e4257b14322bd346d

    const user = await userService.fetchOne(req.params.email);
    if(user !== null){
        return res.status(200).json(user)
    }else{
        return res.status(404).json({message: "User not found"})
    }
    
    
})

<<<<<<< HEAD
usersRouter.post('/create', jsonParser , async(req : Request , res: Response) => {

    if(UserValidator(req, res) && await UserExists(req.body.user_id)){
        await userService.create(req.body);
        return res.status(201).json("Created");
=======
usersRouter.post('/', jsonParser , async(req : Request , res: Response) => {
>>>>>>> bccfcd03589a91f78c3dd60e4257b14322bd346d

    if(UserValidator(req, res)){
        const created = await userService.create(req.body);
        return res.status(201).json(created);
    }else{
        return res.status(400).json({message: "Not valid user"})
    }

})

<<<<<<< HEAD
usersRouter.put('/update', jsonParser , async(req :Request , res : Response) => {
=======
usersRouter.put('/', jsonParser , async(req :Request , res : Response)=> {
>>>>>>> bccfcd03589a91f78c3dd60e4257b14322bd346d

        const updatedUser = await userService.update(req.body);
        return res.status(202).json(updatedUser);
})

<<<<<<< HEAD
usersRouter.delete('/delete/:id', jsonParser , async(req : Request , res : Response)  => {
=======
usersRouter.delete('/:email', jsonParser , async(req : Request , res : Response) => {
>>>>>>> bccfcd03589a91f78c3dd60e4257b14322bd346d

    if(await UserExists(req.params.email) !== null){

        const remainingList =  await userService.deleteOne(req.params.email);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "User does not exist"})
    }
})