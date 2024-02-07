
exports.checkID = (req, res, next, val) => {
  console.log(`User id is ${val}`);
  next();
};

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if(!req.body.email || !req.body.password){
    return res.status(400).json({
      message: "Failed"
    });
  } 
  console.log("first")
  next();
};

exports.getAllUsers = (req, res) => {
  console.log(req.reqTime);
  res.status(200).json({
    status: "success",
    requestedAt: req.reqTime,
    data: {
      users: [{ name: "USERS" }],
    },
  });
};

exports.getUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "USER" }],
    },
  });
};

exports.deleteUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "DELETE" }],
    },
  });
};

exports.createUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "CREATED USER" }],
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
