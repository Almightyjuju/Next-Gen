const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createBarber = async ({
  name = "first last",
  email,
  shopNumber,
  password,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [barber],
    } = await db.query(
      `INSERT INTO barbers(name, email, shopNumber, password) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING RETURNING *`,
      [name, email, shopNumber, hashedPassword]
    );
    return barber;
  } catch (err) {
    throw err;
  }
};

const getBarber = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  try {
    const barber = await getBarberbyEmail(email);
    if (!barber) throw new Error("Barber not found");
    const hashedPassword = barber.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) throw new Error("Invalid password");
    delete barber.password;
    return barber;
  } catch (err) {
    throw err;
  }
};

const getBarberbyId = async (barberId) => {
  try {
    const {
      rows: [barber],
    } = await db.query("SELECT * FROM barbers where id = $1", [barberId]);
    if (!barber) {
      throw new Error("Barber not found");
    }
    return barber;
  } catch (err) {
    throw err;
  }
};
const getBarberbyEmail = async () => {
  try {
    const {
      rows: [barber],
    } = await db.query(`SELECT FROM barbers where email = $1;`[email]);
    if (!barber) {
      return;
    }
    return barber;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createBarber,
  getBarber,
  getBarberbyId,
  getBarberbyEmail,
};
