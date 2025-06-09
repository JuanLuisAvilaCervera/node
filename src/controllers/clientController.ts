import {Request , Response, Router} from 'express';

import bodyParser from 'body-parser';
import { ClientService } from '../services/clientService';
import { ClientExists, ClientValidator, UpdateClientValidator } from '../validators/clientValidator';


export const clientsRouter = Router();
const clientService = new ClientService();


clientsRouter.get('/', async(req : Request , res: Response)=> {
    const clientList = await clientService.fetchAll();
    return res.status(200).json(clientList)
})

clientsRouter.get('/:email', async(req : Request , res: Response)=> {

    const client = await clientService.fetchOne(req.params.email);
    if(client !== null){
        return res.status(200).json(client)
    }else{
        return res.status(404).json({message: "User not found"})
    }
    
    
})

clientsRouter.post('/', async(req : Request , res: Response) => {

    if(ClientValidator(req, res)){
        const created = await clientService.create(req.body);
        return res.status(201).json(created);
    }else{
        return res.status(400).json({message: "Not valid client"})
    }

})

clientsRouter.put('/' , async(req :Request , res : Response)=> {

    if(await UpdateClientValidator(req, res)){
        const updatedUser = await clientService.update(req.body);
        return res.status(202).json(updatedUser);
    }else{
        return res.status(400).json({message: "User does not exist or updated User is not valid"})
    }
})

clientsRouter.delete('/:email', async(req : Request , res : Response) => {

    if(await ClientExists(req.params.email) !== null){

        const remainingList =  await clientService.deleteOne(req.params.email);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "User does not exist"})
    }
})