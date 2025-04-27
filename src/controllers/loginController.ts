
import { Request , Response, Router } from "express";

export const loginRouter = Router();



const bodyParser = require('body-parser'); // import
const jsonParser = bodyParser.json();

loginRouter.get('/', jsonParser, async(req : Request , res: Response) : Promise<any>=> {

    
 

})