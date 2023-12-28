// const express = require("express");
// const barbersRouter = express.Router();

// const { createBarber, getBarber, getBarberByEmail } = require("../db");

// const jwt = require("jsonwebtoken");

// barbersRouter.post("/", async (req, res, next) => {
//   const { name, email, password } = req.body;
//   try {
//     const barber = await createBarber({ name, email, password });
//     const token = jwt.sign(
//       {
//         id: barber.id,
//         email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1w",
//       }
//     );
//     res.status(201).json({
//       message: "Barber created successfully",
//       token,
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// barbersRouter.get("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const barber = await getBarber(id);
//     if (barber) {
//       res.json(barber);
//     } else {
//       res.status(404).json({ message: "Barber not found" });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// barbersRouter.put("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;
//   try {
//     const barber = await updateBarber(id, { name, email, password });
//     if (barber) {
//       res.json({
//         message: "Barber updated succesfully",
//       });
//     } else {
//       res.status(404).json({
//         message: "Barber not found",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// barbersRouter.patch("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const { name, email, password } = req.body;
//   try {
//     const barber = await partiallyUpdatedBarber(id, { name, email, password });
//     if (barber) {
//       res.json({
//         message: "Barber updated succesfully",
//       });
//     } else {
//       res.status(404).json({ message: "Barber not found" });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// barbersRouter.delete("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const barber = await deleteBarber(id);
//     if (barber) {
//       res.json({
//         message: "Barber deleted successfully",
//       });
//     } else {
//       res.status(404).json({
//         message: "Barber not found",
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = barbersRouter;
