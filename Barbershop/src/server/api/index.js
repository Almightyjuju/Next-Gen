const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const volleyball = require("volleyball");
const { getCustomerbyId } = require("../db/customers");
apiRouter.use(volleyball);

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
        req.customer = await getCustomerbyId(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer`,
    });
  }
});

const customersRouter = require("./customers");
apiRouter.use("/customers", customersRouter);

apiRouter((err, req, res, next) => {
  res.status(res.statusCode ? res.statusCode : 500).send(err);
});

module.exports = apiRouter;
