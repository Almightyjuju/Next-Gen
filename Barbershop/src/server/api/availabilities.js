const express = require("express");
const availabilitiesRouter = express.Router();
const { authenticateToken } = require("./authenticateToken");
const { authenticateBarber } = require("./authenticateBarber");

const {
  createAvailability,
  getAllAvailabilities,
  getAvailabilityById,
  updateAvailability,
  deleteAvailability,
} = require("../db/availabilities");

availabilitiesRouter.get("/", async (req, res, next) => {
  try {
    const availabilities = await getAllAvailabilities();
    res.json({ availabilities });
  } catch (error) {
    next(error);
  }
});

availabilitiesRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const availability = await getAvailabilityById(id);
    res.status(200).json(availability);
  } catch (error) {
    next(error);
  }
});

availabilitiesRouter.post("/", authenticateBarber, async (req, res, next) => {
  try {
    const { barberId, date, timeSlot } = req.body;
    const availability = await createAvailability({
      barberId,
      date,
      timeSlot,
    });
    res.status(201).json(availability);
  } catch (error) {
    next(error);
  }
});

availabilitiesRouter.put("/:id", authenticateBarber, async (req, res, next) => {
  try {
    const { id } = req.paramsconst;
    const { barberId, date, timeSlot } = req.body;
    await updateAvailability(id, {
      barberId,
      date,
      timeSlot,
    });
    res.status(200).json({ message: "Availability updated successfully" });
  } catch (error) {
    next(error);
  }
});

availabilitiesRouter.delete(
  "/:id",
  authenticateBarber,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteAvailability(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = availabilitiesRouter;
