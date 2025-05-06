
import { Request , Response, Router } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

export const loginRouter = Router();

const jsonParser = bodyParser.json();

loginRouter.get('/', jsonParser, async(req : Request , res: Response)=> {
    if(req.body.username !== null && req.body.username !== undefined && req.body.password !== null && req.body.password !== undefined){
        if(typeof req.body.username === "string" && typeof req.body.password === "string" ){
            if(req.body.username === "admin" && req.body.password === "admin"){
                
                return res.status(200).send(generateAccessToken(req.body.username));
            }
        }
    }else{
        return res.sendStatus(401);
    }
})

const  generateAccessToken = (username : string) => {

    const expireTime : number = 3200;

    return jwt.sign({username: username}, process.env.TOKEN_SECRET as string , { expiresIn: '7200s' });
  }