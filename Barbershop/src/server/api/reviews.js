const express = require("express");
const reviewsRouter = express.Router();
const { authenticateToken } = require("./authenticateToken");
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  getReviewbyCustomerId,
  getReviewByBarberId,
  deleteReview,
} = require("../db/reviews");

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/customer", authenticateToken, async (req, res, next) => {
  try {
    const { customerId } = req.user;
    const reviews = await getReviewbyCustomerId(customerId);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.post("/", authenticateToken, async (req, res, next) => {
  try {
    const { customerId, barberId, rating, comment } = req.body;
    const review = await createReview({
      customerId,
      barberId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.put("/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customerId, barberId, rating, comment } = req.body;
    await updateReview(id, { customerId, barberId, rating, comment });
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
