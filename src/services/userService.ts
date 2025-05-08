import { UserInterface } from "../interfaces/userInterface";
import { User } from "../models/userSchema";

export class UserService{


    async fetchAll(){
        return User.find().select('-_id -__v' );
    }

    public async fetchOne(email : string){
        return User.findOne({email: email})
    }

    async create(user : UserInterface){
        return User.create(user);
    }

    async update(updatedUser : UserInterface){
        return User.updateOne({email: updatedUser.email}, 
        {
            first_name: updatedUser.first_name ,
            last_name : updatedUser.last_name ,
            photo : updatedUser.photo,
            active: updatedUser.active ,
            job_description : updatedUser.job_description ,
            contact : updatedUser.contact ,
            start_date : updatedUser.start_date
        })
    }
    

    async deleteOne(email : string){
        return User.deleteOne({email: email})
    }
    


}