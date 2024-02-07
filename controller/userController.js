const getAllUsers = (req, res) => {
    console.log(req.reqTime)
  res.status(200).json({
    status: "success",
    requestedAt:req.reqTime,
    data: {
      users: [{ name: "USERS" }],
    },
  });
};

const getUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "USER" }],
    },
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "DELETE" }],
    },
  });
};

const createUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "CREATE" }],
    },
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [{ name: "UPDATE" }],
    },
  });
};

module.exports = {
    updateUser,
    createUser,
    deleteUser,
    getAllUsers,
    getUser
}