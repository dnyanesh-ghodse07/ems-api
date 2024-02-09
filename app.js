const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");

const app = express();
// middleware - it should comes before the request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());


// Route Handlers

// Routes
app.use("/api/v1/users", userRouter);

app.all("*", (req,res,next) => {
  res.status(404).json({
    status: "fail",
    message: `Cant find ${req.originalUrl} on this server!`
  })
})

module.exports = app;
