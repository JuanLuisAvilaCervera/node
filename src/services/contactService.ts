
import { ClientInterface } from "../interfaces/clientInterface";
import { ContactInterface } from "../interfaces/contactInterface";
import { Contact } from "../models/contactSchema";
import { ClientService } from "./clientService";

export class ContactService{

    async fetchAll(){
        return Contact.find();
    }

    public async fetchOne(comment_date : string , email : string){

        const clientService = new ClientService();
        const client : ClientInterface | null = await clientService.fetchOne(email);

        if(client !== null){
            return Contact.findOne({comment_date : comment_date , client : client})
        }else{
            return null;
        }
    }

    // async create(contact : ContactInterface){
    //     return Contact.create(contact);
    // }

    async update(updatedContact : ContactInterface){

        const clientService = new ClientService();
        const client : ClientInterface | null = await clientService.fetchOne(updatedContact.client.email as string);

        if(client !== null){
            return Contact.updateOne({comment_date : updatedContact.comment_date , client : client}, 
                {
                    archived: updatedContact.archived
                })
        }else{
            return null;
        }

        
    }
    
    



}