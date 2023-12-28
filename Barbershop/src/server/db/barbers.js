const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createBarber = async ({
  name = "first last",
  email,
  image,
  shopNumber,
  password,
}) => {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [barber],
    } = await db.query(
      `INSERT INTO barbers(name, email, image, shopNumber, password) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING RETURNING *`,
      [name, email, image, shopNumber, hashedPassword]
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

const getAllBarbers = async () => {
  try {
    const { rows: barbers } = await db.query(`SELECT * FROM barbers`);
    return barbers;
  } catch (err) {
    throw err;
  }
};

const getBarberbyEmail = async () => {
  try {
    const {
      rows: [barber],
    } = await db.query(`SELECT * FROM barbers where email = $1;`[email]);
    if (!barber) {
      return;
    }
    return barber;
  } catch (err) {
    throw err;
  }
};

const updateBarber = async (
  barberId,
  { name, email, image, shopNumber, password }
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [updatedBarber],
    } = await db.query(
      `UPDATE barbers SET name = $1, email $2, image = $3, shopNumber = $4, password = $5 WHERE id = $6. RETURNING *`,
      [name, email, image, shopNumber, hashedPassword, barberId]
    );
    if (!updatedBarber) {
      throw new Error("Barber not found or update failed");
    }
    delete updatedBarber.password;
    return updatedBarber;
  } catch (err) {
    throw err;
  }
};

const deleteBarber = async (barberId) => {
  try {
    const {
      rows: [deletedBarber],
    } = await db.query(`DELETE FROM barbers where id = $1 RETURNING *`, [
      barberId,
    ]);
    if (!deletedBarber) {
      throw new Error("Barber not found");
    }
    delete deletedBarber.password;
    return deletedBarber;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createBarber,
  getBarber,
  getAllBarbers,
  getBarberbyId,
  getBarberbyEmail,
  updateBarber,
  deleteBarber,
};
