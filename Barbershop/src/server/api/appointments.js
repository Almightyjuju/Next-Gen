const express = require("express");
const appointmentsRouter = express.Router();
const { authenticateToken } = require("./authenticateToken");
const { authenticateBarber } = require("./authenticateBarber");

const {
  getAppointments,
  getAppointmentById,
  getCustomerAppointments,
  getBarberAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../db/appointments");

appointmentsRouter.get("/", async (req, res, next) => {
  try {
    const appointments = await getAppointments();
    res.json({ appointments });
  } catch (error) {
    next(error);
  }
});

appointmentsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await getAppointmentById(id);
    res.status(200).json(appointment);
  } catch (error) {
    next(error);
  }
});

appointmentsRouter.get(
  "/customer",
  authenticateToken,
  async (req, res, next) => {
    try {
      const { customerId } = req.customer;
      const appointments = await getCustomerAppointments(customerId);
      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
);

appointmentsRouter.get(
  "/barber",
  authenticateBarber,
  async (req, res, next) => {
    try {
      const { barberId } = req.barber;
      const appointments = await getBarberAppointments(barberId);
      res.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
);
