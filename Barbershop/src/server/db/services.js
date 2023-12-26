const db = require("./client");

const createService = async (service) => {
  const { name, duration, price } = service;
  const query = `INSERT INTO SERVICES( name, duration, price) VALUES ($1, $2, $3)`;
  const values = [name, duration, price];
  await db.query(query, values);
};
const getServices = async () => {
  const query = `SELECT * FROM services`;
  const result = await db.query(query);
  return result.rows;
};

const updateService = async (service) => {
  const { id, name, duration, price } = service;
  const query = `UPDATE SERVICES SET name = $1, duration = $2, price = $3 WHERE id = $4`;
  const values = [name, duration, price, id];
  await db.query(query, values);
};

const deleteService = async (id) => {
  const query = `DELETE FROM services where id = $1`;
  const values = [id];
  await db.query(query, values);
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};
