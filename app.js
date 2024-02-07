const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");

const app = express();

// middleware - it should comes before the request
app.use(morgan("dev"));
app.use(express.json());

// Route Handlers

// Routes
app.use("/api/v1/users", userRouter);
// app.get("/api/v1/users",getAllUsers)
// app.post("/api/v1/users",createUser)

// app.get("/api/v1/users/:id",getUser)
// app.patch("/api/v1/users/:id", updateUser)
// app.delete("/api/v1/users/:id", deleteUser)

module.exports = app;
