const express = require("express");
const { signup, login ,getAllUsers, updateRole} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

router.get(
   "/users",
   authMiddleware,
   adminMiddleware,
   getAllUsers
);

router.put(
   "/role/:id",
   authMiddleware,
   adminMiddleware,
   updateRole
);

module.exports = router;