const express = require("express");
const customersRouter = express.Router();

const {
  createCustomer,
  getCustomer,
  getCustomerByEmail,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../db/");

const jwt = require("jsonwebtoken");

customersRouter.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const _customer = await getCustomerByEmail(email);
    if (_customer) {
      next({
        name: "CustomerExistsError",
        message: "A customer with that email already exists",
      });
    }
    const customer = await createCustomer({
      name,
      email,
      phoneNumber,
      password,
    });
    const token = jwt.sign(
      {
        id: customer.id,
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

customersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const customer = await getCustomer({ email, password });
    if (customer) {
      const token = jwt.sign(
        {
          customerId: customer.id,
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

customersRouter.get("/", async (req, res, next) => {
  try {
    const customers = await getAllCustomers();
    res.send({ customers });
  } catch (error) {
    next(error);
  }
});

customersRouter.get("/:id", async (req, res, next) => {
  const customerId = req.params.id;

  try {
    const customer = await getCustomerById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    delete customer.password;

    res.json(customer);
  } catch (error) {
    next(error);
  }
});

customersRouter.delete("/:id", async (req, res, next) => {
  const customerId = req.params.customerId;

  try {
    const deletedCustomer = await deleteCustomer(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({
        error: "Customer not found or already deleted",
      });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = customersRouter;
