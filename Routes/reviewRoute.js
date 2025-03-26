const createReview = require("../Controllers/ReviewController/createReview");

const Router = require("express").Router();

Router.post("/createReview", createReview);

module.exports = Router;
