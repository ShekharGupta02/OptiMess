const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  markMeal,
  getMealCount,
  predictMeals,
  getMealAnalytics,
  getAllMeals,
  deleteMeal,
  getMealStats,
  getMealHistory
} = require("../controllers/mealController");

const router = express.Router();

router.post("/mark", authMiddleware, markMeal);

router.get("/count", authMiddleware, getMealCount);

router.get("/predict", authMiddleware, predictMeals);

router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getMealAnalytics
);

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllMeals
);

router.get(
   "/stats",
   authMiddleware,
   adminMiddleware,
   getMealStats
);

router.get(
   "/history",
   authMiddleware,
   getMealHistory
);

router.delete(
   "/:id",
   authMiddleware,
   adminMiddleware,
   deleteMeal
);

module.exports = router;