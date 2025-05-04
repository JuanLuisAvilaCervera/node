import { faker } from '@faker-js/faker';
import { User } from '../models/userSchema';
import { UserInterface } from '../interfaces/userInterface';


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
