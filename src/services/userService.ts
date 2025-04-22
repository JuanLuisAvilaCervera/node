import { UserInterface } from "../interfaces/userInterface";
import { UserValidator } from "../validators/userValidator";
import Users from "../data/Users.json"

export class UserService{

    private userList : UserInterface[] = [];

    constructor() {
        this.userList = [];
    }

    async fetchAll(){
        this.userList.push( ...Users);
        return this.userList;
    }

    public async fetchById(id : number){

        console.log("Id: " +id + " " + typeof id)
        this.userList.push( ...Users);
        const userFetchedArray = this.userList.filter((user) => user.user_id === id)

        if(userFetchedArray.length > 0){
            return this.userList.filter((user) => user.user_id === id)[0];
        }else{
            return "Usuario no existente";
        }
    }

    async create(user : UserInterface){
        this.userList.push(user)
        return user;
    }

    async update(updatedUser : UserInterface){

        console.log("Updated id : " + updatedUser.user_id)

        const oldUser = await this.fetchById(updatedUser.user_id);

        if( oldUser !== "Usuario no existente"){
            
            oldUser.first_name = updatedUser.first_name;
            oldUser.last_name = updatedUser.last_name;
            oldUser.start_date = updatedUser.start_date;
            oldUser.email = updatedUser.email;
            oldUser.contact = updatedUser.contact;
            oldUser.job_description = updatedUser.job_description;
            oldUser.photo = updatedUser.photo;
            oldUser.active = updatedUser.active;
            return oldUser;
        }else{
            return "Usuario no existente"
        }
    }


}