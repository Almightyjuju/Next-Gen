const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const volleyball = require("volleyball");
apiRouter.use(volleyball);

// set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;
      if (id) {
        req.customer = await getCustomerById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer'`,
    });
  }
});

const customersRouter = require("./customers");
const barbersRouter = require("./barbers");
const servicesRouter = require("./services");
const reviewsRouter = require("./reviews");
const appointmentsRouter = require("./appointments");
const availabilitiesRouter = require("./availabilities");

apiRouter.use("/customers", customersRouter);
apiRouter.use("/barbers", barbersRouter);
apiRouter.use("/services", servicesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/appointments", appointmentsRouter);
apiRouter.use("/availabilities", availabilitiesRouter);

apiRouter.use((err, req, res, next) => {
  res.status(res.statusCode ? res.statusCode : 500).send(err);
});

module.exports = apiRouter;
