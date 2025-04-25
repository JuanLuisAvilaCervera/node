import {Request , Response, Router} from 'express';
import Bookings from '../data/Bookings.json'
import { BookingService } from '../services/bookingService';
import { UpdateBookingValidator, BookingExists, BookingValidator } from '../validators/bookingValidator';
import { IdValidator } from '../validators/idValidator';


export const bookingsRouter = Router();
const bookingService = new BookingService();

const bodyParser = require('body-parser'); // import
const jsonParser = bodyParser.json();

bookingsRouter.get('/', async(req : Request , res: Response) : Promise<any>=> {
    const bookingList = await bookingService.fetchAll();
    return res.status(200).json(bookingList)
})

bookingsRouter.get('/:id', async(req : Request , res: Response) : Promise<any>=> {

    if(IdValidator(req.params.id)){
        const booking = await bookingService.fetchById(parseInt(req.params.id));
        return res.status(200).json(booking)
    }else{

    }
    
})

bookingsRouter.post('/create', jsonParser , async(req : Request , res: Response) : Promise<any> => {

    if(BookingValidator(req, res) && BookingExists(req.body.booking_id) === "Id incorrecto"){
        await bookingService.create(req.body);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json({message: "No funciona"}) // Cambiar comentarios
    }

})

bookingsRouter.put('/update', jsonParser , async(req :Request , res : Response) : Promise<any> => {

    if(UpdateBookingValidator(req, res)){
        const updatedBooking = await bookingService.update(req.body);
        if(updatedBooking !== "Usuario no existente"){
            return res.status(202).json(updatedBooking);
        }else{
            return res.status(400).json({ message: "Usuario no existente"})
        }
        

    }else{
        return res.status(400).json({message: "No funciona"})
    }
})

bookingsRouter.delete('/delete/:id', jsonParser , async(req : Request , res : Response) : Promise<any> => {

    if(BookingExists(req.params.id) !== "Id incorrecto"){

        const remainingList = typeof req.params.id !== "number" ? await bookingService.deleteId(parseInt(req.params.id)) : await bookingService.deleteId(req.params.id);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "Id no existente"})
    }
})