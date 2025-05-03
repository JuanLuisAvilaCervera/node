import { Router } from "express";
import { TankService } from "../services/tankService";
import { TankInterface } from "../interfaces/tankInterface";

const tankRouter = Router();

tankRouter.get('/', async(req : Request , res: Response) => {
    const tankService = new TankService();
    const tankList = await tankService.fetchAll();
    console.log(tankList.length)
    res.status(200).json(tankList);
})

tankRouter.post('/', async(req : Request , res: Response) => {
    const tankService = new TankService();
    const addedTank = await tankService.create({size: "small"} as TankInterface);
    res.status(201).json(addedTank);
})

export default tankRouter;