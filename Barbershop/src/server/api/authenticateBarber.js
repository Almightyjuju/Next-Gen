const jwt = require("jsonwebtoken");
const { getBarberById } = require("../db/barbers");

const authenticateBarber = async (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    console.error("No Authorization header");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = auth.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const barber = await getBarberById(decoded.userId);

    if (!barber) {
      console.error("Barber not found");
      return res.status(403).json({ message: "Forbidden" });
    }

    req.barber = barber;
    console.log("Authenticated Barber:", req.barber);
    next();
  } catch (err) {
    console.error("Token verification error:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = { authenticateBarber };
