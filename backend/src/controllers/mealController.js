const Meal = require("../models/Meal");

exports.markMeal = async (req, res) => {
  try {
    const { date, willEat } = req.body;

    if(
   !date ||
   typeof willEat !==
   "boolean"
){

   return res.status(400)
   .json({
      message:
      "Invalid input"
   });

}

const dateRegex =
/^\d{4}-\d{2}-\d{2}$/;

if(
   !dateRegex.test(date)
){

   return res.status(400)
   .json({
      message:
      "Date must be YYYY-MM-DD"
   });

}
   
     //check if user already marked meal for this date
    let meal = await Meal.findOne({
      user: req.user.id,
      date: date
    });

    if(meal) {
      //update existing meal
      meal.willEat = willEat;

      await meal.save();

      return res.json({
        message: "Meal updated successfully"
      });
    }

    //create new meal entry
     meal = new Meal({
      user: req.user.id,
      date,
      willEat
    });

    await meal.save();

    res.json({ message: "Meal marked successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMealCount = async (req, res) => {
  try {

    const count =
    await Meal.countDocuments({

      willEat:true

    });

    res.json({

      count

    });

  } catch (error) {

    res.status(500).json({

      message:error.message

    });

  }
};


exports.predictMeals =
async (req,res) => {

   try{

      const meals =
      await Meal.aggregate([
         {
            $match:{
               willEat:true
            }
         },
         {
            $group:{
               _id:"$date",
               count:{
                  $sum:1
               }
            }
         },
         {
            $sort:{
               _id:-1
            }
         },
         {
            $limit:3
         }
      ]);

      if(meals.length === 0){
         return res.json({
            prediction:0
         });
      }

      const total =
      meals.reduce(
         (sum,item)=>
         sum + item.count,
         0
      );

      const prediction =
      Math.round(
         total / meals.length
      );

      res.json({
         prediction
      });

   } catch(error){

      res.status(500).json({
         message:error.message
      });

   }

};

exports.getMealAnalytics = async (req, res) => {
  try {

    const analytics = await Meal.aggregate([
      {
        $match: {
          willEat: true
        }
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]);

    res.json(analytics);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllMeals = async (req, res) => {
   try {

      const meals = await Meal.find()
         .populate("user", "name email role");

      res.json(meals);

   } catch(error){
      res.status(500).json({
         message:error.message
      });
   }
};

exports.deleteMeal = async (req,res) => {
   try{

      const meal =
      await Meal.findByIdAndDelete(
         req.params.id
      );

      if(!meal){
         return res.status(404).json({
            message:"Meal not found"
         });
      }

      res.json({
         message:
         "Meal deleted successfully"
      });

   } catch(error){

      res.status(500).json({
         message:error.message
      });

   }
};

exports.getMealStats = async (req,res) => {
   try{

      const totalMeals =
      await Meal.countDocuments();

      const studentsEating =
      await Meal.countDocuments({
         willEat:true
      });

      const studentsSkipping =
      await Meal.countDocuments({
         willEat:false
      });

      res.json({
         totalMeals,
         studentsEating,
         studentsSkipping
      });

   } catch(error){

      res.status(500).json({
         message:error.message
      });

   }
};

exports.getMealHistory =
async (req,res)=>{

   try{

      const meals =
      await Meal.find({
         user:req.user.id
      })
      .sort({
         date:-1
      });

      res.json(meals);

   } catch(error){

      res.status(500).json({
         message:error.message
      });

   }

};

exports.getAllUsers =
async (req,res)=>{

   try{

      const users =
      await User.find()
      .select(
         "-password"
      );

      res.json(users);

   } catch(error){

      res.status(500)
      .json({
         message:error.message
      });

   }

};