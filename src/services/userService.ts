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
        return this.userList.findIndex((user) => user.user_id === id);

    }

    async create(user : UserInterface){
        this.userList.push(user)
        return user;
    }

    async update(updatedUser : UserInterface){

        const fetchedId = await this.fetchById(updatedUser.user_id);
        const oldUser = this.userList[fetchedId]
        
        oldUser.first_name = updatedUser.first_name;
        oldUser.last_name = updatedUser.last_name;
        oldUser.start_date = updatedUser.start_date;
        oldUser.email = updatedUser.email;
        oldUser.contact = updatedUser.contact;
        oldUser.job_description = updatedUser.job_description;
        oldUser.photo = updatedUser.photo;
        oldUser.active = updatedUser.active;
        return oldUser;
    }
    

    async deleteId(id : number){
        const deletedUser = this.userList.filter((user) => user.user_id === id);
        this.userList = this.userList.filter((user) => user.user_id !== id )
        return this.userList
    }
    


}