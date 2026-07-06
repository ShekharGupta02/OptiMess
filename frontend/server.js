const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const mealRoutes = require("./src/routes/mealRoutes");

dotenv.config();//load environment variables

//initialize appw
const app = express();



app.use(express.json()); //allows json data

app.use(cors());//allows frontend to connect

app.use("/api/auth", authRoutes);

app.use("/api/meal", mealRoutes);

app.get("/" , (req,res) => {
  res.send("OptiMess API is running");
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
});