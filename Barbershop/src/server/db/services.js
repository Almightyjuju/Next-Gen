const db = require("./client");

const createService = async (service) => {
  try {
    const { name, duration, price } = service;
    const query = `INSERT INTO SERVICES( name, duration, price) VALUES ($1, $2, $3)`;
    const values = [name, duration, price];
    await db.query(query, values);
  } catch (error) {
    throw error;
  }
};
const getAllServices = async () => {
  try {
    const query = `SELECT * FROM services`;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw err;
  }
};

const getServiceById = async (id) => {
  try {
    const query = `SELECT * FROM services WHERE id = $1`;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateService = async (service) => {
  try {
    const { id, name, duration, price } = service;
    const query = `UPDATE SERVICES SET name = $1, duration = $2, price = $3 WHERE id = $4`;
    const values = [name, duration, price, id];
    await db.query(query, values);
  } catch (error) {
    throw error;
  }
};

const deleteService = async (id) => {
  try {
    const query = `DELETE FROM services where id = $1`;
    const values = [id];
    await db.query(query, values);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
