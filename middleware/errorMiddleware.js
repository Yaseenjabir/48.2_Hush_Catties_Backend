// errorMiddleware.js

function errorMiddleware(err, req, res, next) {
  console.error(err); // Log the error
  res.status(500).json({
    message: "Something went wrong, please try again later.",
  });
}

module.exports = errorMiddleware;
