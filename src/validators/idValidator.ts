import { Request , Response} from "express";

export const  IdValidator = (id : string | number) => {

    if(typeof id == "number"){
        return true
    }
    return !isNaN(parseInt(id))
}