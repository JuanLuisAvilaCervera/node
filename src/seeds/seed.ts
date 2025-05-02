import { faker } from '@faker-js/faker';
import { User } from '../models/userSchema';


function createRandomUser(): typeof User {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const job_description = faker.person.jobDescriptor();
  const phone_number = faker.phone.number({style: "human"});

  return {
    first_name : firstName,
    last_name: lastName,
    photo: faker.image.avatar(),
    start_date: faker.date.recent(),
    email: email,
    job_description: job_description,
    phone: phone_number,
    active : faker.datatype.boolean(),
  };
}

const createUser : typeof User = createRandomUser();