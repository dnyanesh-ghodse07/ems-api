const User = require("../models/userModels");
const { handleErrorResponse } = require("../utils/handleErrorResponse");

exports.checkID = (req, res, next, val) => {
  console.log(`User id is ${val}`);
  next();
};

exports.checkBody = (req, res, next) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).json({
      message: "Failed"
    });
  } 
  next();
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      requestedAt: req.reqTime,
      data: {
        users,
      },
    });
  } catch (error) {
   res.status(401).json({
    status: "error",
    error: error.message
   })
  }
  
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    
    if(!user) {
      throw new Error("User not found !")
    }

    res.status(200).json({
      status: "success",
      data: {
        user
      },
    });
  } catch (error) {
    handleErrorResponse(res,error)
  }
  
};

exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "DELETE" }],
    },
  });
};


exports.updateUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "UPDATE" }],
    },
  });
};
