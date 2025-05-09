
import { ClientInterface } from "../interfaces/clientInterface";
import { Client } from "../models/clientSchema";

export class ClientService{

    async fetchAll(){
        console.log(Client.find())
        return Client.find();
    }

    async fetchOne(email : string){
        return Client.findOne({email: email})
    }

    async create(client : ClientInterface){
        return Client.create(client);
    }

    async update(updatedClient : ClientInterface){
        return Client.updateOne({email: updatedClient.email}, 
        {
            first_name: updatedClient.first_name ,
            last_name : updatedClient.last_name ,
            phone : updatedClient.phone,
        })
    }
    
    async deleteOne(email : string){
        return Client.deleteOne({email: email})
    }
}