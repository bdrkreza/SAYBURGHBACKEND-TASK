const authController = require("../controllers/authController");

const authRouter = require("express").Router();


authRouter.route("/register").post(authController.register)

module.exports= authRouter;