import { UserInterface } from "../interfaces/userInterface";
import { UserValidator } from "../validators/userValidator";
import Users from "../data/Users.json"
import { User } from "../models/userSchema";

export class UserService{

    private userList : UserInterface[] = [];

    constructor() {
        this.userList = [...Users];
    }

    async fetchAll(){
        console.log(User.find())
        return User.find();
    }

    public async fetchOne(email : string){
        return User.findOne({email: email})

    }

    async create(user : UserInterface){
        this.userList.push(user)
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
    

    async deletOne(email : string){
        return User.deleteOne({email: email})
    }
    


}