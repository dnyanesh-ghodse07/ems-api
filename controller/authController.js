const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const {handleErrorResponse} = require("../utils/handleErrorResponse");
const {generateToken} = require("../utils/generateToken");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if email exist
    if (!email || !password) {
      throw new Error("Please provide email & password");
    }

    // check if user exist && password is correct
    const user = await User.findOne({ email }).select("+password");
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Please provide valid email & password!");
    }

    //if everything ok send token to client
    const token = generateToken(user._id);
    
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.protect = async (req,res,next) => {
  console.log("PROTECT")
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }

    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: "error",
      error: error.message
     })
  }
  //get token & check if it's there

  //verification

  //check if user still exists

  //check if user changed password after token issued


}

// exports.restrictTo = (...roles) => {
 
//   return (req,res,next) => {
//     //roles ["admin","lead-guide"]

//     if(!roles.includes(req.user.role))
//   }

// }
