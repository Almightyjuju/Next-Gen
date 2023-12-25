const db = require("./client");
const { createCustomer } = require("./customers.js");
const { createBarber } = require("./barbers.js");
const { createService } = require("./services.js");
const { createAvailability } = require("./availability.js");

// ... customers data ...
const customers = [
  {
    name: "Junior Pizzati",
    email: "alexanderpizzati11@gmail.com",
    phoneNumber: "504-237-6099",
    password: "Jujuthemenace",
  },
];

// ... barbers data ...
const barbers = [
  {
    name: "Kevin Vicknair",
    email: "Kjvicknair@yahoo.com",
    shopNumber: "+1(504)493-5992",
    password: "Athena418",
  },

  {
    name: "Leo Martinez",
    email: "Martinez.leo51@yahoo.com",
    shopNumber: "+1(504)493-5992",
    password: "MartinezLeo",
  },
];

// ... services data ...
const services = [
  {
    name: "Haircut",
    price: 30,
    duration: "45 mins",
  },
  {
    name: "Haircut & Beard / Facial Hair",
    price: 35,
    duration: "1 hr",
  },
  {
    name: "Kids Haircut",
    price: 25,
    duration: "45 mins",
  },
  {
    name: "Lining",
    price: 15,
    duration: "20 mins",
  },
  {
    name: "Lining with Beard",
    price: 20,
    duration: "25 mins",
  },
];

// ... availability ...

const availability = [];

// ... drop tables ...
const dropTables = async () => {
  try {
    await db.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS appointments;
    DROP TABLE IF EXISTS availability;
    DROP TABLE IF EXISTS services;
    DROP TABLE IF EXISTS barbers;
    DROP TABLE IF EXISTS customers;
      `);
  } catch (err) {
    throw err;
  }
};

// ... create tables ...

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS customers (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          phoneNumber VARCHAR(55) NOT NULL,
          password VARCHAR(255) NOT NULL
      )`);

    await db.query(`CREATE TABLE IF NOT EXISTS barbers(
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255) DEFAULT 'name', 
        email VARCHAR(255) UNIQUE NOT NULL, 
        shopNumber VARCHAR(55) NOT NULL, 
        password VARCHAR(255) NOT NULL
      )`);

    await db.query(`CREATE TABLE IF NOT EXISTS services(
      id SERIAL PRIMARY KEY, 
      name VARCHAR(255) NOT NULL, 
      duration VARCHAR(255), 
      price DECIMAL(10,2) NOT NULL 
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS availability(
      id SERIAL PRIMARY KEY, 
      barberId INT,
      date DATE NOT NULL, 
      startTime TIME NOT NULL,
      endTime TIME NOT NULL,
      FOREIGN KEY (barberId) REFERENCES barbers(id)
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS appointments(
        id  SERIAL PRIMARY KEY, 
        customerId INT, 
        barberId INT, 
        serviceId INT, 
        appointmentDate DATE NOT NULL, 
        appointmentTime TIME NOT NULL, 
        FOREIGN KEY (customerId) REFERENCES customers(id), 
        FOREIGN KEY (barberId) REFERENCES barbers(id), 
        FOREIGN KEY (serviceId) REFERENCES services(id)
      )`);

    await db.query(`CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      customerId INT, 
      barberId INT, 
      rating INT NOT NULL, 
      comment TEXT, 
      FOREIGN KEY (customerId) REFERENCES customers(id), 
      FOREIGN KEY (barberID) REFERENCES barbers(id)

    )`);
  } catch (err) {
    throw err;
  }
};

const insertCustomers = async () => {
  try {
    for (const customer of customers) {
      await createCustomer({
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        password: customer.password,
      });
    }
    console.log("Customer's seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting customer's seed data:", error);
  }
};

const insertBarbers = async () => {
  try {
    for (const barber of barbers) {
      await createBarber({
        name: barber.name,
        email: barber.email,
        shopNumber: barber.shopNumber,
        password: barber.password,
      });
    }
    console.log("Barber's seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting barber's seed data", error);
  }
};

const insertServices = async () => {
  try {
    for (const service of services) {
      await createService({
        name: service.name,
        price: service.price,
        duration: service.duration,
      });
    }
    console.log("Service seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting service seed data", error);
  }
};

// const insertAppointments = async () => {
//   try {
//     for (const appointment of appointments) {
//       await createAppoinment({
//         date: appointment.date,
//         time: appointment.time,
//         status: appointment.status || "booked",
//       });
//     }
//     console.log("Appointments inserted successfuly");
//   } catch (error) {
//     console.error("Error inserting appointments:", error);
//   }
// };

const seedDatabase = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertCustomers();
    await insertBarbers();
    await insertServices();
    // await insertAppointments();
    console.log("Seed data inserted succesfully");
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
