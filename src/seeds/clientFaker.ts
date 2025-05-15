
import express from "express";
import { json } from "body-parser";
import { createNewClient, createNewUser } from "./seed";
import { UserInterface } from "../interfaces/userInterface";

import { Sequelize } from "sequelize";
import { ClientInterface } from "../interfaces/clientInterface";

const sequelize = new Sequelize('miranda-database', 'root', process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});



declare module 'express' {
    export interface Request {
        user: string;
    }
}

const app = express();

app.use(json());

const generateClients = (num : number) => {
    const fakedClients : ClientInterface[] = [];
  
    for (let i = 0; i < num; i++) {
      let fakeClient : ClientInterface = createNewClient();
      sequelize.query(`INSERT INTO client (first_name , last_name , contact , email) VALUES ('${fakeClient.first_name}','${fakeClient.last_name}','${fakeClient.phone}','${fakeClient.email}')`)
    }
  sequelize.query('SELECT * FROM client')
            .then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));
    return fakedClients;
};
console.log(generateClients(30))