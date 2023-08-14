const client = require('./db.js');
const faker = require('faker');

const dropTables = async() => {
  try {
      await client.query(`
          DROP TABLE IF EXISTS appointments;
          DROP TABLE IF EXISTS pets;  
          DROP TABLE IF EXISTS owners;  
      `);
      console.log('TABLES DROPPED!');
  } catch(error) {
      console.log(error);
  }
}

const createTables = async() => {
  try {
      await client.query(`
          CREATE TABLE owners(
              Id SERIAL PRIMARY KEY,
              Name VARCHAR(30) NOT NULL
          );

          CREATE TABLE pets(
              Id SERIAL PRIMARY KEY,
              Name VARCHAR(20) NOT NULL,
              Type VARCHAR(20) NOT NULL,
              Owner_Id INTEGER REFERENCES owners(Id)
          );

          CREATE TABLE appointments(
              Id SERIAL PRIMARY KEY,
              Date DATE NOT NULL,
              Pet_Id INTEGER REFERENCES pets(Id),
              Description TEXT
          );
      `);
      console.log('TABLES CREATED!');
  } catch(error) {
      console.log(error);
  }
}


const syncAndSeed = async() => {
  try {
    await client.connect();
    console.log('CONNECTED TO THE DB!');

    await dropTables();
    await createTables();

    await seedOwners();
    await seedPets();
    await seedAppointments();

    await client.end(); 
  } catch(error) {
    console.log(error);
  }
}

syncAndSeed();
