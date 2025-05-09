import { faker } from '@faker-js/faker';
import { User } from '../models/userSchema';
import { UserInterface } from '../interfaces/userInterface';
import { BookingInterface } from '../interfaces/bookingInterface';
import { ClientInterface } from '../interfaces/clientInterface';
import { ContactInterface } from '../interfaces/contactInterface';
import { RoomInterface } from '../interfaces/roomInterface';
import { Room } from '../models/roomSchema';


export const  createNewUser : () => UserInterface = () =>{
  const sex = faker.person.sexType();
  const firstName : string = faker.person.firstName(sex);
  const lastName :string = faker.person.lastName();
  const email : string= faker.internet.email({ firstName, lastName });
  const job_description : string= faker.person.jobDescriptor();
  const phone_number : string = faker.phone.number({style: "human"});
  const photo : string = faker.image.avatar();
  // const date = faker.date.past({years: 3})
  const date : string= faker.string.numeric({length : 10})

  return {
    first_name : firstName,
    last_name : lastName,
    email : email,
    job_description : job_description,
    contact : phone_number,
    photo: photo,
    start_date : date,
    active : faker.datatype.boolean({probability : 0.5}),
  } as UserInterface;
}

const createNewClient : () => ClientInterface = () => {

  const sex = faker.person.sexType();
  const firstName : string = faker.person.firstName(sex);
  const lastName :string = faker.person.lastName();
  const email : string= faker.internet.email({ firstName, lastName });
  const phone : string = faker.phone.number({style : "human"})

  return {
    first_name: firstName,
    last_name: lastName,
    email : email,
    phone : phone,
  } as ClientInterface

}

export const createNewContact : () => ContactInterface = () => {

  const client : ClientInterface = createNewClient();
  const comment_date : string = faker.string.numeric({length : 10})
  const subject : string = faker.commerce.productName()
  const comment: string = faker.lorem.sentence({min: 50 , max : 150})
  const archived : boolean = faker.datatype.boolean({probability : 0.5})

  return {
    client : client,
    comment_date: comment_date,
    subject: subject,
    comment: comment,
    archived: archived,
  }as ContactInterface
}

// enum RoomTypes {
//   SBed = 'Single Bed',
//   DBed = 'Double Bed',
//   DSuperior = 'Double Superior',
//   Suite = 'Suite'
// }

export const createNewRoom : () => RoomInterface = () => {

  const room_number: number = faker.number.int({min : 1 , max: 999}); 
  // const room_type: string = faker.helpers.enumValue(RoomTypes)
  const description : string = faker.lorem.sentence({min : 50 , max : 150})

  // const nPhotos : number = faker.number.int({min : 3 , max: 5})

  // const photos: string[] = []

  // for(let i = 0 ; i <= nPhotos ; i++){
  //   photos.push(faker.image.urlPicsumPhotos())
  // }

  const offer: boolean = faker.datatype.boolean({probability : 0.5})
  const price: number = faker.number.float({min: 50 , max: 300})
  const discount: number = faker.number.float({min: 0 , max: 100})
  const cancellation_policy: string = faker.lorem.sentence({min : 50 , max: 150})
  const amenities: string = faker.commerce.department();

  return {
    room_number: room_number,
    // room_type: room_type,
    description : description,
    // photos: photos,
    offer: offer,
    price: price,
    discount: discount,
    cancellation_policy: cancellation_policy,
    amenities: amenities
  } as RoomInterface

}

enum Status {
  InProgress = 'In Progress',
  CheckIn = 'Check In',
  CheckOut = 'Check Out',
}


export const createNewBooking : () => BookingInterface = () => {

  const order_date: string = faker.string.numeric({length : 10})
  const check_in_date:string = faker.string.numeric({length : 10})
  const check_out_date:string = faker.string.numeric({length : 10})
  const status: "In Progress" | "Check In" | "Check Out" = faker.helpers.enumValue(Status)
  const special_request: string = faker.commerce.department();

  return {
    order_date: order_date,
    check_in_date:check_in_date,
    check_out_date:check_out_date,
    status: status,
    special_request: special_request,
  }as BookingInterface
}
