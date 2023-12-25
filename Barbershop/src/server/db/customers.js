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
    if (!customer) throw new Error("User not found");
    const hashedPassword = customer.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) throw new Error("Invalid password");
    delete customer.password;
    return customer;
  } catch (err) {
    throw err;
  }
};

const getCustomerbyId = async (customerId) => {
  try {
    const {
      rows: [customer],
    } = await db.query("SELECT * FROM customers where id = $1", [customerId]);
    if (!customer) {
      throw new Error("User not found");
    }
    return customer;
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

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerbyId,
  getCustomerByEmail,
};
