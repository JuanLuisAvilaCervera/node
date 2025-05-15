import { Sequelize } from "sequelize";
import { UserInterface } from "../interfaces/userInterface";
import { User } from "../models/userSchema";


const sequelize = new Sequelize('miranda-database', 'root', process.env.SQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

const checkDate = ( date : string | Date) =>{
    return new Date(date);
}


export class UserService{
    async fetchAll(){
        return sequelize.query('SELECT * FROM user');
    }

    public async fetchOne(email : string){
        return sequelize.query(`SELECT * from user WHERE email = '${email}'`)
    }

    async create(user : UserInterface){

        const date = checkDate(user.start_date);
        return sequelize.query(`INSERT INTO user  (first_name , last_name , email , photo , start_date , job_description , active , contact) VALUES ('${user.first_name}','${user.last_name}','${user.email}','${user.photo}','${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}','${user.job_description}',${user.active},'${user.contact}' )`)
    }

    async update(email : string , updated : UserInterface){
        return sequelize.query(`UPDATE user SET first_name='${updated.first_name}' , last_name='${updated.last_name}' , photo = '${updated.photo}' , job_description = '${updated.job_description}' , active = ${updated.active} , contact = '${updated.contact}' WHERE email = '${email}'`)
    }
    

    async deleteOne(email : string){
        return sequelize.query(`DELETE FROM user WHERE email='${email}'`)
    }
    


}