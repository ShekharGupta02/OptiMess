const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password} = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });
    
    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
        process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req,res)=>{

   try{

      const users =
      await User.find()
      .select("-password");

      res.json(users);

   } catch(error){

      res.status(500)
      .json({
         message:error.message
      });

   }

};

exports.updateRole =
async (req,res)=>{

   try{

      const { role } =
      req.body;

      const user =
      await User
      .findByIdAndUpdate(
         req.params.id,
         { role },
         { new:true }
      );

      if(!user){

         return res
         .status(404)
         .json({
            message:
            "User not found"
         });

      }

      const updatedUser =
await User.findById(
   user._id
).select("-password");

res.json({
   message:
   "Role updated",
   user:
   updatedUser
});

   } catch(error){

      res.status(500)
      .json({
         message:error.message
      });

   }

   

};