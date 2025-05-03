import { TankInterface } from "../interfaces/tankInterface";
import { Tank } from "../models/tankSchema";

export class TankService{
    async fetchAll(){

            return Tank.find();
    }

    async create(tank : TankInterface){
        return Tank.create(tank);
    }
}