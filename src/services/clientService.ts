
import { Sequelize } from "sequelize";
import { ClientInterface } from "../interfaces/clientInterface";
import { Client } from "../models/clientSchema";

const sequelize = new Sequelize('miranda-database', 'root', process.env.SQL_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

const checkDate = ( date : string | Date) =>{
    return new Date(date);
}

export class ClientService{

    async fetchAll(){
        return sequelize.query('SELECT * FROM client');
    }

    async fetchOne(idclient : string){
        return sequelize.query(`SELECT * from client WHERE idclient = ${idclient}`)
    }

    async create(client : ClientInterface){
        return sequelize.query(`INSERT INTO client (first_name , last_name , contact , email) VALUES ('${client.first_name}','${client.last_name}','${client.phone}','${client.email}')`);
    }

    async update(updatedClient : ClientInterface){
        return sequelize.query(`UPDATE client SET first_name='${updatedClient.first_name}' , last_name='${updatedClient.last_name}' , contact = '${updatedClient.phone}' WHERE email = '${updatedClient.email}' `);
    }
    
    async deleteOne(email : string){
        return sequelize.query(`DELETE FROM client WHERE email =  '${email}'`)
    }
}