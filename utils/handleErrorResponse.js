exports.handleErrorResponse = function (res, error) {
  if (error.code === 11000) {
    // Duplicate key error (unique index violation)
    res.status(400).json({ error: "Duplicate key violation", status: "error" });
  } else if (error.name === "ValidationError") {
    // Mongoose validation error
    res.status(422).json({ error: "Validation failed", status: "error" });
  } else {
    // Other MongoDB errors
    res.status(500).json({ error: "Internal Server Error", status: "error" });
  }
};
