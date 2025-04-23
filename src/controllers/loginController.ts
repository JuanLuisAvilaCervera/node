import {Request , Response, Router} from 'express';
import Users from '../data/Users.json'
import { UserService } from '../services/userService';
import { IdValidator } from '../validators/idValidator';
import bodyParser from 'body-parser';


export const loginRouter = Router();
const userService = new UserService();
const jsonParser = bodyParser.json();

loginRouter.post('/', async(req : Request , res: Response)  : Promise<any>=> {
    const userList = await userService.fetchAll();
    return res.status(200).json(userList)
})