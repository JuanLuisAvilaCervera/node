
import { RoomValidator } from "../validators/roomValidator";
import Rooms from "../data/Rooms.json"
import { RoomInterface } from "../interfaces/roomInterface";

export class RoomService{

    private roomList : RoomInterface[] = [];

    constructor() {
        this.roomList = [...Rooms];
    }

    async fetchAll(){
        return this.roomList;
    }

    public async fetchById(id : number){
        const roomFetchedArray = this.roomList.filter((room) => room.room_id === id)
        return roomFetchedArray.length > 0 ? this.roomList.filter((room) => room.room_id === id)[0] : "Usuario no existente";

    }

    async create(room : RoomInterface){
        this.roomList.push(room)
        return room;
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
        console.log(id)
        const deletedroom = this.roomList.filter((room) => room.room_id === id);
        console.log(deletedroom[0])
        this.roomList = this.roomList.filter((room) => room.room_id !== id )
        return this.roomList
    }
}

