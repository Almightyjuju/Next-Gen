const db = require("./client");

const createAvailability = async (availability) => {
  const { barberId, date, timeSlot } = availability;
  const query = `INSERT INTO availabilities(
    barberId, date, timeSlot) VALUES ($1, $2, $3)`;
  const values = [barberId, date, timeSlot];
  await db.query(query, values);
};

const getAvailabilities = async () => {
  const query = `SELECT * FROM availabilities`;
  const result = await db.query(query);
  return result.rows;
};

const updateAvailability = async (availability) => {
  const { id, barberId, date, timeSlot } = availability;
  const query = `UPDATE availabilities SET barberId = $1, date = $2, timeSlot = $3 WHERE id = $4`;
  const values = [barberId, date, timeSlot, id];
  await db.query(query, values);
};

const deleteAvailability = async (id) => {
  const query = `DELETE FROM availabilities where id = $1`;
  const values = [id];
  await db.query(query, values);
};

module.exports = {
  createAvailability,
  getAvailabilities,
  updateAvailability,
  deleteAvailability,
};
