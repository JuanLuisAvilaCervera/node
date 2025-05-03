
import { RoomValidator } from "../validators/roomValidator";
import Rooms from "../data/Rooms.json"
import { RoomInterface } from "../interfaces/roomInterface";
import mongoose from "mongoose";
import { Room } from "../models/roomSchema";
import { IdValidator } from "../validators/idValidator";

export class RoomService{

    private roomList : RoomInterface[] = [];

    constructor() {
        this.roomList = [...Rooms];
    }

    async fetchAll(){
        // return this.roomList;
        console.log(Room.find())
        return Room.find();
    }

    public async fetchById(id : number){
        console.log(id)
        const roomFetchedArray = this.roomList.filter((room) => room.room_id === id)
        return roomFetchedArray.length > 0 ? this.roomList.filter((room) => room.room_id === id)[0] : "Usuario no existente";
        
    }

    async create(room : RoomInterface){
        return Room.create(room);
    }

    async update(updatedroom : RoomInterface){

        const oldroom = await this.fetchById(updatedroom.room_id);

        if( oldroom !== "Usuario no existente"){
            
            oldroom.room_type = updatedroom.room_type;
            oldroom.description = updatedroom.description;
            oldroom.photos = updatedroom.photos;
            oldroom.offer = updatedroom.offer;
            oldroom.price = updatedroom.price;
            oldroom.discount = updatedroom.discount;
            oldroom.cancellation_policy = updatedroom.cancellation_policy;
            oldroom.amenities = updatedroom.amenities;
            return oldroom;
        }else{
            return "Usuario no existente"
        }
    }
    

    async deleteId(id : number){

        this.roomList = this.roomList.filter((room) => room.room_id !== id )
        return this.roomList
    }

    RoomExists = (id : string | number) =>{ // devolver booleano, cambiar a service
        if(IdValidator(id)){
            const userService = new RoomService();
            if(typeof id !== "number"){
                return userService.fetchById(parseInt(id)) 
            }else{
                return userService.fetchById(id)
            }
            
        }else{
            return "Id incorrecto"
        }
    }
    
    UpdateRoomValidator = (req : Request, res : Response) => {
        return(RoomValidator( req, res) === "Correct" && this.RoomExists(req.body.room_id !== null ? req.body.room_id : {}) !== "Id incorrecto")
    }

    
}

