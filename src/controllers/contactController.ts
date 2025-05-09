import {Request , Response, Router} from 'express';
import { ContactService } from '../services/contactService';

import bodyParser from 'body-parser';

export const contactsRouter = Router();
const contactService = new ContactService();

const jsonParser = bodyParser.json();

contactsRouter.get('/', async(req : Request , res: Response) => {
    const contactList = await contactService.fetchAll();
    return res.status(200).json(contactList)
})

contactsRouter.put('/', jsonParser , async(req :Request , res : Response) => {

        const updatedcontact = await contactService.update(req.body);
        if(updatedcontact !== null){
            return res.status(202).json(updatedcontact);
        }else{
            return res.status(400).json({ message: "Contacto no existente"})
        }
})