const jwt = require("jsonwebtoken");
const { getCustomerById } = require("../db/customers");

const authenticateToken = async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    console.error("No Authorization");
    return res.status(404).json({ message: "Unauthorized" });
  }
  const token = auth.slice(7);
  try {
    const decoded = jwt.veryify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    const customer = await getCustomerById(decoded.customerId);
    if (!customer) {
      console.error("Customer not found");
      return res.status(403).json({ message: "Forbidden " });
    }
    req.customer = customer;
    console.log("Authenticated Customer:", req.customer);
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ Message: "Token expired" });
    }
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = { authenticateToken };
