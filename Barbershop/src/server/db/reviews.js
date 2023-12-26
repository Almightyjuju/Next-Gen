const db = require("./client");

const createReview = async ({ customerId, barberId, rating, comment }) => {
  try {
    const query = `INSERT INTO reviews (customerId, barberId, rating, comment) VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [customerId, barberId, rating, comment];
    const result = await db.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

const getAllReviews = async () => {
  try {
    const query = `SELECT * FROM reviews`;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error getting reviews:", error);
    throw error;
  }
};

const getReviewById = async (id) => {
  try {
    const query = `SELECT * FROM reviews WHERE id = $1`;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting review by ID:", error);
    throw error;
  }
};

const UpdateReview = async (id, { customerId, barberId, rating, comment }) => {
  try {
    const query = `UPDATE reviews SET customerId = $1, barberId = $2, rating = $3, comment =$4 WHERE id = $5`;
    const values = [customerId, barberId, rating, comment, id];
    await db.query(query, values);
    console.log("Review updated successfully");
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

const DeleteReview = async (id) => {
  try {
    const query = `DELETE FROM reviews WHERE id = $1`;
    const values = [id];
    await db.query(query, values);
    console.log("Review deleted successfully");
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  UpdateReview,
  DeleteReview,
};
