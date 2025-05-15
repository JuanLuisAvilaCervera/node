
import express from "express";
import { json } from "body-parser";
import { createNewUser } from "./seed";
import { UserInterface } from "../interfaces/userInterface";

import { Sequelize } from "sequelize";

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

const generateUsers = (num : number) => {
    const fakedUsers : UserInterface[] = [];
  
    for (let i = 0; i < num; i++) {
      let fakeUser : UserInterface = createNewUser();
      sequelize.query(`INSERT INTO user (first_name , last_name , email , photo , start_date , job_description , active , contact) VALUES ('${fakeUser.first_name}','${fakeUser.last_name}','${fakeUser.email}','${fakeUser.photo}','${fakeUser.start_date.getFullYear()}/${fakeUser.start_date.getMonth() + 1}/${fakeUser.start_date.getDate()}','${fakeUser.job_description}',${fakeUser.active},'${fakeUser.contact}' )`)
    }
    sequelize.query('SELECT * FROM user')
      .then( () => console.log("Data inserted")).catch( (error) => console.log("Error: "+ error));
    return fakedUsers;
};
console.log(generateUsers(30))

