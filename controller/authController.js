const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

function handleError (res, statusCode, errorMessage) {
  return res.status(statusCode).json({
    status: "fail",
    error: errorMessage,
  });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "development") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // remove password from the output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    handleError(res, 401, error.message);
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
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    handleError(res, 401, error.message);
  }
};

exports.protect = async (req, res, next) => {
  try {
    //get token & check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }
    //verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //check if user still exists
    const freshUser = await User.findById(decoded.id);
    
    if (!freshUser) {
      throw new Error("User belong to this token is no longer exist");
    }
    //check if user changed password after token issued

    req.user = freshUser;
    next();
  } catch (error) {
    handleError(res, 401, error.message);
  }
};

exports.restrictTo = (roles) => {
  return (req, res, next) => {
    //roles ["admin","lead-guide"]
    if (req.user.role !== roles[0]) {
      new Error("You do not have permission")
    }
    next();
  };
};
