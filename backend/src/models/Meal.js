const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: String,
    required: true
  },
  willEat: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealSchema);