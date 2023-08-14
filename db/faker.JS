const faker = require('faker');
const client = require('./db');


const createOwner = async(firstName, lastName, address, phoneNumber, email) => {
  try {
    await client.query(`
      INSERT INTO owners (Name, lastName, address, phoneNumber, email)
      VALUES ($1, $2, $3, $4, $5);
    `, [firstName, lastName, address, phoneNumber, email]);

    console.log('OWNER CREATED');
  } catch(error) {
    console.log(error);
  }
}

const createPet = async(petName, petType, color, breed, age, ownerId) => {
  try {
    await client.query(`
      INSERT INTO pets (Name, Type, color, breed, age, Owner_Id)
      VALUES ($1, $2, $3, $4, $5, $6);
    `, [petName, petType, color, breed, age, ownerId]);

    console.log('PET CREATED');
  } catch(error) {
    console.log(error);
  }
}

const createAppointment = async(appointmentDate, reason, petId) => {
  try {
    await client.query(`
      INSERT INTO appointments (appointmentDate, reason, petId)
      VALUES ($1, $2, $3);
    `, [appointmentDate, reason, petId]);

    console.log('APPOINTMENT CREATED');
  } catch(error) {
    console.log(error);
  }
}

const seedOwners = async(numOwners = 10) => {
  for(let i = 0; i < numOwners; i++) {
    await createOwner(
      faker.name.firstName(),
      faker.name.lastName(),
      faker.address.streetAddress(),
      faker.phone.phoneNumber(),
      faker.internet.email()
    );
  }
}

const seedPets = async(numPets = 30) => {
  const petTypes = ["Dog", "Cat", "Bird", "Fish", "Reptile"];
  const petColors = ["Black", "White", "Brown", "Grey", "Golden"];
  for(let i = 0; i < numPets; i++) {
    const randomOwnerId = Math.floor(Math.random() * 10) + 1;
    await createPet(
      faker.name.firstName(),
      faker.random.arrayElement(petTypes),
      faker.random.arrayElement(petColors),
      faker.lorem.word(),
      faker.random.number({min: 1, max: 15}),
      randomOwnerId
    );
  }
}

const seedAppointments = async(numAppointments = 50) => {
  const reasons = ["Vaccination", "Regular Checkup", "Surgery", "Emergency"];
  for(let i = 0; i < numAppointments; i++) {
    const randomPetId = Math.floor(Math.random() * 30) + 1;
    await createAppointment(
      faker.date.future(),
      faker.random.arrayElement(reasons),
      randomPetId
    );
  }
}
