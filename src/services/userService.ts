import { UserInterface } from "../interfaces/userInterface";
import { User } from "../models/userSchema";


// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database





export class UserService{


    async fetchAll(){


        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'trial',
            password: 'admin'
        });


        try {
            const [results, fields] = await connection.query(
                'SELECT * FROM `user` ;'
            );

            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            return results;
        } catch (err) {
            console.log(err);
        }
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