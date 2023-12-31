const db = require("./client");

const createAppointment = async (appointment) => {
  const {
    customerId,
    barberId,
    serviceId,
    appointmentDate,
    appointmentTime,
    status,
  } = appointment;
  const query = `INSERT INTO appointments (customerId, barberId, serviceId, appointmentDate, appointmentTime, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const values = [
    customerId,
    barberId,
    serviceId,
    appointmentDate,
    appointmentTime,
    status,
  ];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating appointment: ${error}`);
  }
};

const getAppointments = async () => {
  const query = `SELECT * FROM appointments;`;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting appointments: ${error}`);
  }
};

const getAppointmentById = async (id) => {
  const query = `SELECT * FROM appointments WHERE id = $1;`;
  const values = [id];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error getting appointment ${error}`);
  }
};

const getCustomerAppointments = async (customerId) => {
  const query = `SELECT * FROM appointments WHERE customerId = $1;`;
  const values = [customerId];
  try {
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting customer's appointments: ${error}`);
  }
};

const getBarberAppointments = async (barberId) => {
  const query = `SELECT * FROM appointments WHERE barberId = $1;`;
  const values = [barberId];
  try {
    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting barber's appointments: ${error}`);
  }
};

const updateAppointment = async (id, appointment) => {
  const {
    customerId,
    barberId,
    serviceId,
    appointmentDate,
    appointmentTime,
    status,
  } = appointment;
  const query = `UPDATE appointments SET customerId = $1, barberId = $2, serviceId = $3, appointmentDate = $4, appointmentTime = $5, status = $6  WHERE id = $7 RETURNING *;`;
  const values = [
    customerId,
    barberId,
    serviceId,
    appointmentDate,
    appointmentTime,
    status,
    id,
  ];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating appointment: ${error}`);
  }
};

const deleteAppointment = async (id) => {
  const query = `DELETE FROM appointments WHERE id = $1;`;
  const values = [id];
  try {
    await db.query(query, values);
    return true;
  } catch (error) {
    throw new Error(`Error deleting appointment: ${error}`);
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  getCustomerAppointments,
  getBarberAppointments,
  updateAppointment,
  deleteAppointment,
};
