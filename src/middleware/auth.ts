import jwt from "jsonwebtoken"
import { Request, Response } from "express"


export function authenticateToken(req : Request, res : Response, next : () => void) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  if(verifyPassword(req.user , "admin")){
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)

      if (err) return res.sendStatus(403)

      next()
    })
  }

}

const verifyPassword = (user : string , password: string) : boolean => {
  return true;
}