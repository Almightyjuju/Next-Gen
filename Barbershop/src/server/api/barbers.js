const express = require("express");
const barbersRouter = express.Router();

const {
  createBarber,
  getBarber,
  getBarberByEmail,
  getAllBarbers,
  getBarberById,
  deleteBarber,
} = require("../db/");

const jwt = require("jsonwebtoken");

barbersRouter.post("/register", async (req, res, next) => {
  const { name, email, password, image, shopNumber } = req.body;
  try {
    const _barber = await getBarberByEmail(email);
    if (_barber) {
      next({
        name: "BarberExistsError",
        message: "A barber with that email already exists",
      });
    }
    const barber = await createBarber({
      name,
      email,
      image,
      shopNumber,
      password,
    });
    const token = jwt.sign(
      {
        id: barber.id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.send({
      message: "Sign up successful!",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

barbersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const barber = await getBarber({ email, password });
    if (barber) {
      const token = jwt.sign(
        {
          barberId: barber.id,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: "Login successful",
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (err) {
    next(err);
  }
});

barbersRouter.get("/", async (req, res, next) => {
  try {
    const barbers = await getAllBarbers();
    res.send({ barbers });
  } catch (error) {
    next(error);
  }
});

barbersRouter.get("/:id", async (req, res, next) => {
  const barberId = req.params.id;

  try {
    const barber = await getBarberById(barberId);

    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }
    delete barber.password;

    res.json(barber);
  } catch (error) {
    next(error);
  }
});

barbersRouter.delete("/:id", async (req, res, next) => {
  const barberId = req.params.id;

  try {
    const deletedBarber = await deleteBarber(barberId);

    if (!deletedBarber) {
      return res.status(404).json({
        error: "Barber not found or already deleted",
      });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = barbersRouter;
