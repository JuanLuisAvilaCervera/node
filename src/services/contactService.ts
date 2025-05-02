
import Contacts from "../data/Contacts.json"
import { ContactInterface } from "../interfaces/contactInterface";

export class ContactService{

    private contactList : ContactInterface[] = [];

    constructor() {
        this.contactList = [...Contacts];
    }

    async fetchAll(){
        return this.contactList;
    }

    public async fetchById(id : number){
        const contactFetchedArray = this.contactList.filter((contact) => contact.contact_id === id)
        return contactFetchedArray.length > 0 ? this.contactList.filter((contact) => contact.contact_id === id)[0] : "Contacto no existente";

    }

    async create(contact : ContactInterface){
        this.contactList.push(contact)
        return contact;
    }

    async update(updatedcontact : ContactInterface){

        const oldcontact = await this.fetchById(updatedcontact.contact_id);

        if( oldcontact !== "Contacto no existente"){
            
            oldcontact.client_id = updatedcontact.client_id;
            oldcontact.comment_date = updatedcontact.comment_date;
            oldcontact.subject = updatedcontact.subject;
            oldcontact.comment = updatedcontact.comment;
            oldcontact.archived = updatedcontact.archived;
            return oldcontact;
        }else{
            return "Contacto no existente"
        }
    }
    

    async deleteId(id : number){
        const deletedcontact = this.contactList.filter((contact) => contact.contact_id === id);
        this.contactList = this.contactList.filter((contact) => contact.contact_id !== id )
        return this.contactList
    }


}