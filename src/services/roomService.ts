import { Sequelize } from "sequelize";
import { RoomInterface } from "../interfaces/roomInterface";
import { Room } from "../models/roomSchema";
import { IdValidator } from "../validators/idValidator";

const sequelize = new Sequelize('miranda-database', 'root', process.env.SQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});


export class RoomService{

    async fetchAll(){
        return sequelize.query(`SELECT * FROM room`);
    }

    public async fetchById(room_number: number){
        return Room.findOne({room_number : room_number});
    }

    async create(room : RoomInterface){
        return Room.create(room);
    }

    async update(updatedroom : RoomInterface){
        return Room.updateOne({room_number: updatedroom.room_number}, 
        {
            description: updatedroom.description,
            offer: updatedroom.offer,
            price: updatedroom.price,
            discount: updatedroom.discount,
            cancellation_policy : updatedroom.cancellation_policy,
            amenities: updatedroom.amenities,
        });
    }
    

    async deleteId(room_number : number){
        return Room.deleteOne({room_number : room_number})
    }

    RoomExists = (room_number : string | number) =>{ // devolver booleano, cambiar a service
        if(IdValidator(room_number)){
            if(typeof room_number !== "number"){
                return Room.findOne({room_number : parseInt(room_number)}) 
            }else{
                return Room.findOne({room_number : room_number})
            }
            
        }else{
            return "Id incorrecto"
        }
    }
    
}

            // photos: updatedroom.photos,
            // room_type: updatedroom.room_type,
