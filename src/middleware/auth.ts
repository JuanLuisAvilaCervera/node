import jwt from "jsonwebtoken"
import { Request , Response, Router } from "express";

export const loginRouter = Router();

const bodyParser = require('body-parser'); // import
const jsonParser = bodyParser.json();

loginRouter.get('/', async(req : Request , res: Response) : Promise<any>=> {
    
  if(req.body.username === "admin" && req.body.password === "admin"){
    
    const token = generateAccessToken(req.body.username);

    return res.status(200).send(token);

  }

})

function generateAccessToken(username : string) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

