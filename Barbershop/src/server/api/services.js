const express = require("express");
const servicesRouter = express.Router();
const { authenticateBarber } = require("./authenticateBarber");
const {
  createSerice,
  getAllServices,
  getServiceById,
  updateService,
  deleteServce,
} = require("../db/services");

servicesRouter.get("/", async (req, res, next) => {
  try {
    const services = await getAllServices();
    res.json({ services });
  } catch (error) {
    next(error);
  }
});

servicesRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await getServiceById(id);
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
});

servicesRouter.post("/", authenticateBarber, async (req, res, next) => {
  try {
    const { name, duration, price } = req.body;
    await createSerice({ name, duration, price });
    res.status(201).json({ message: "Service created successfully" });
  } catch (error) {
    next(error);
  }
});

servicesRouter.patch("/:id", authenticateBarber, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, duration, price } = req.body;
    await updateService({ id, name, duration, price });
    res.json({ message: "Service updated successfully" });
  } catch (error) {
    next(error);
  }
});

servicesRouter.delete("/:id", authenticateBarber, async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteServce(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = servicesRouter;
