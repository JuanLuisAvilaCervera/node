import {Request , Response, Router} from 'express';
import Bookings from '../data/Bookings.json'
import { BookingService } from '../services/bookingService';
import {  BookingValidator } from '../validators/bookingValidator';
import { IdValidator } from '../validators/idValidator';

import bodyParser from 'body-parser';


export const bookingsRouter = Router();
const bookingService = new BookingService(); //mover dentro de cada


bookingsRouter.get('/', async(req : Request , res: Response) : Promise=> {
    const bookingList = await bookingService.fetchAll();
    res.status(200).json(bookingList)
    return;
})

bookingsRouter.get('/:id', async(req : Request , res: Response)=> {

    if(IdValidator(req.params.id)){
        const booking = await bookingService.fetchById(parseInt(req.params.id));
        return res.status(200).json(booking)
    }
    
})

bookingsRouter.post('/' , async(req : Request , res: Response)=> {

    
    if(BookingValidator(req, res) && await BookingExists(req.body.booking_id)){
        await bookingService.create(req.body);
        return res.status(201).json("Created");

    }else{
        return res.status(400).json({message: "Cannot create Booking, Booking not valid or existing booking"})
    }

})

bookingsRouter.put('/' , async(req :Request , res : Response) => {

        const updatedBooking = await bookingService.update(req.body);
        return res.status(202).json(updatedBooking);
})

bookingsRouter.delete('/:id', async(req : Request , res : Response) => {

    if(await BookingExists(req.params.id)){

        const remainingList = typeof req.params.id !== "number" ? await bookingService.deleteId(parseInt(req.params.id)) : await bookingService.deleteId(req.params.id);
        
        return res.status(202).json(remainingList);
    }else{
        return  res.status(400).json({message: "Non existing Booking"})
    }
})