import {Request , Response, Router} from 'express';
import { UpdatecontactValidator, contactExists, contactValidator } from '../validators/contactValidator';
import { IdValidator } from '../validators/idValidator';
import { ContactService } from '../services/contactService';

export const contactsRouter = Router();
const contactService = new ContactService();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

contactsRouter.get('/', async(req : Request , res: Response) : Promise<any> => {
    const contactList = await contactService.fetchAll();
    return res.status(200).json(contactList)
})

contactsRouter.get('/:id', async(req : Request , res: Response) : Promise<any> => {

    if(IdValidator(req.params.id)){
        const contact = await contactService.fetchById(parseInt(req.params.id));
        return res.status(200).json(contact)
    }else{

    }
    
})

contactsRouter.post('/create', jsonParser , async(req : Request , res: Response) : Promise<any> => {

    if(contactValidator(req, res) && contactExists(req.body.contact_id) === "Id incorrecto"){
        await contactService.create(req.body);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json({message: "No funciona"})

    }

})

contactsRouter.put('/update', jsonParser , async(req :Request , res : Response) : Promise<any> => {

    if(UpdatecontactValidator(req, res)){
        const updatedcontact = await contactService.update(req.body);
        if(updatedcontact !== "Contacto no existente"){
            return res.status(202).json(updatedcontact);
        }else{
            return res.status(400).json({ message: "Contacto no existente"})
        }
        

    }else{
        return res.status(400).json({message: "No funciona"})
    }
})

contactsRouter.delete('/delete/:id', jsonParser , async(req : Request , res : Response) : Promise<any> => {

    if(contactExists(req.params.id) !== "Id incorrecto"){

        const remainingList = typeof req.params.id !== "number" ? await contactService.deleteId(parseInt(req.params.id)) : await contactService.deleteId(req.params.id);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "Id no existente"})
    }
})