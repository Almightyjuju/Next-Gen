const db = require("./client");
const { createCustomer } = require("./customers.js");
const { createBarber } = require("./barbers.js");
const { createService } = require("./services.js");
const { createAvailability } = require("./availabilities.js");
const { createAppointment } = require("./appointments.js");
const { createReview } = require("./reviews.js");
// 1 ... customers data ...
const customers = [
  {
    name: "Junior Pizzati",
    email: "alexanderpizzati11@gmail.com",
    phoneNumber: "504-237-6099",
    password: "Jujuthemenace",
  },

  {
    name: "Perry Stubs",
    email: "perrystubs@gmail.com",
    phoneNumber: "504-292-3303",
    password: "LeoandCleo",
  },
];

// 2 ... barbers data ...
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

// 3 ... services data ...
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

// 4 ... availability data ...

const availabilities = [
  {
    barberId: 1,
    date: "2023-12-26",
    timeSlot: "10:00 AM - 11:00AM",
  },
  {
    barberId: 1,
    date: "2023-12-26",
    timeSlot: "10:45 AM - 11:30 AM",
  },
  {
    barberId: 2,
    date: "2023-12-26",
    timeSlot: "11:00 AM - 11:45 AM",
  },
];

// 5 ... appointments data ...

const appointments = [
  {
    customerId: 1,
    barberId: 1,
    serviceId: 1,
    appointmentDate: "2023-12-26",
    appointmentTime: "6:00 PM",
    status: "Confirmed",
  },

  {
    customerId: 2,
    barberId: 1,
    serviceId: 1,
    appointmentDate: "2023-12-26",
    appointmentTime: "4:15 PM",
    status: "Pending",
  },
];

// ... reviews ...

const reviews = [
  {
    customerId: 1,
    barberId: 1,
    rating: 5,
    comment: "Excellent service, highly recommended!",
  },
  {
    customerId: 2,
    barberId: 1,
    rating: 5,
    comment: "Good haircut, very happy with the outcome. Friendly barber.",
  },
];

// ... drop tables ...
const dropTables = async () => {
  try {
    await db.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS appointments;
    DROP TABLE IF EXISTS availabilities;
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

    await db.query(`CREATE TABLE IF NOT EXISTS availabilities(
      id SERIAL PRIMARY KEY, 
      barberId INT,
      date DATE NOT NULL, 
      timeSlot VARCHAR(255) NOT NULL,
      FOREIGN KEY (barberId) REFERENCES barbers(id)
    )`);

    await db.query(`CREATE TABLE IF NOT EXISTS appointments(
        id  SERIAL PRIMARY KEY, 
        customerId INT, 
        barberId INT, 
        serviceId INT, 
        appointmentDate DATE NOT NULL, 
        appointmentTime TIME NOT NULL, 
        status VARCHAR(255),
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
    console.log("Service's seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting service seed data", error);
  }
};

const insertAvailabilities = async () => {
  try {
    for (const availability of availabilities) {
      await createAvailability({
        barberId: availability.barberId,
        date: availability.date,
        timeSlot: availability.timeSlot,
      });
    }
  } catch {}
};

const insertAppointments = async () => {
  try {
    for (const appointment of appointments) {
      await createAppointment({
        customerId: appointment.customerId,
        barberId: appointment.barberId,
        serviceId: appointment.serviceId,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        status: appointment.status,
      });
    }
    console.log("Appointment's seed inserted successfully");
  } catch (error) {
    console.error("Error inserting appointments:", error);
  }
};

const insertReviews = async () => {
  try {
    for (const review of reviews) {
      await createReview({
        customerId: review.customerId,
        barberId: review.barberId,
        rating: review.rating,
        comment: review.comment,
      });
    }
    console.log("Review's seed inserted successfully");
  } catch (error) {
    console.error("Error inserting reviews:", error);
  }
};

const seedDatabase = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertCustomers();
    await insertBarbers();
    await insertServices();
    await insertAvailabilities();
    await insertAppointments();
    await insertReviews();
    console.log("Seed data inserted succesfully");
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
