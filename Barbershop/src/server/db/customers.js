const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createCustomer = async ({
  name = "first last",
  email,
  phoneNumber,
  password,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [customer],
    } = await db.query(
      `
      INSERT INTO customers(name, email, phoneNumber, password)
      VALUES($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING
      RETURNING *`,
      [name, email, phoneNumber, hashedPassword]
    );
    if (!customer) {
      throw new Error("Customer already exists with that email");
    }

    return customer;
  } catch (err) {
    throw err;
  }
};

const getCustomer = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  try {
    const customer = await getCustomerByEmail(email);
    if (!customer) throw new Error("Customer not found");
    const hashedPassword = customer.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) throw new Error("Invalid password");
    delete customer.password;
    return customer;
  } catch (err) {
    throw err;
  }
};

const getCustomerById = async (customerId) => {
  try {
    const {
      rows: [customer],
    } = await db.query("SELECT * FROM customers where id = $1", [customerId]);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  } catch (err) {
    throw err;
  }
};

const getAllCustomers = async () => {
  try {
    const { rows: customers } = await db.query(`SELECT * FROM customers`);
    return customers;
  } catch (err) {
    throw err;
  }
};

const getCustomerByEmail = async (email) => {
  try {
    const {
      rows: [customer],
    } = await db.query(
      `
      SELECT * 
      FROM customers
      WHERE email=$1;`,
      [email]
    );

    if (!customer) {
      return;
    }
    return customer;
  } catch (err) {
    throw err;
  }
};

const updateCustomer = async (
  customerId,
  { name, email, phoneNumber, password }
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [updatedCustomer],
    } = await db.query(
      `UPDATE customers SET name = $1, email = $2, phoneNumber = $3, password = $4, WHERE id = $5 RETURNING *`,
      [name, email, phoneNumber, hashedPassword, customerId]
    );
    if (!updatedCustomer) {
      throw new Error("Customer not found or update failed");
    }
    return updatedCustomer;
  } catch (err) {
    throw err;
  }
};

const deleteCustomer = async (customerId) => {
  try {
    const {
      rows: [customer],
    } = await db.query("DELETE from customers WHERE id = $1 RETURNING *", [
      customerId,
    ]);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  getAllCustomers,
  getCustomerByEmail,
  updateCustomer,
  deleteCustomer,
};
