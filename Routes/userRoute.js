const getProfile = require("../Controllers/UserControllers/getProfile");
const { loginUser } = require("../Controllers/UserControllers/loginUser");
const { registerUser } = require("../Controllers/UserControllers/registerUser");
const updateProfile = require("../Controllers/UserControllers/updateProfile");
const { asyncMiddleware } = require("../middleware/asyncMiddleware");
const { verifyJwtToken } = require("../middleware/verifyToken");

const Router = require("express").Router();

Router.post("/registerUser", asyncMiddleware(registerUser));
Router.post("/loginUser", asyncMiddleware(loginUser));
Router.get("/getProfile", verifyJwtToken, asyncMiddleware(getProfile));
Router.patch("/updateProfile", verifyJwtToken, asyncMiddleware(updateProfile));

module.exports = Router;
