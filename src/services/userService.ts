import { UserInterface } from "../interfaces/userInterface";
import { UserValidator } from "../validators/userValidator";
import Users from "../data/Users.json"

export class UserService{

    private userList : UserInterface[] = [];

    constructor() {
        this.userList = [...Users];
    }

    async fetchAll(){
        return this.userList;
    }

    public async fetchById(id : number){
        const userFetchedArray = this.userList.filter((user) => user.user_id === id)
        return userFetchedArray.length > 0 ? this.userList.filter((user) => user.user_id === id)[0] : "Usuario no existente";

    }

    async create(user : UserInterface){
        this.userList.push(user)
        return user;
    }

    async update(updatedUser : UserInterface){

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
    

    async deleteId(id : number){
        console.log(id)
        const deletedUser = this.userList.filter((user) => user.user_id === id);
        console.log(deletedUser[0])
        this.userList = this.userList.filter((user) => user.user_id !== id )
        return this.userList
    }


}