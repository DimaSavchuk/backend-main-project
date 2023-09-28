const express = require("express");
const router = express.Router();

const auth = require("../../middlewares/auth");
const validateBody = require("../../middlewares/validateBody");

const { auth: controller } = require("../../controllers/index");
const errorHandler = require("../../helpers/errorHandler");

const { registerSchema, loginSchema } = require("../../models/userModel");

router.post(
  "/signup",
  validateBody(registerSchema),
  errorHandler(controller.register)
);
router.post(
  "/signin",
  auth,
  validateBody(loginSchema),
  errorHandler(controller.login)
);
router.post("/signout", auth, errorHandler(controller.logout));

module.exports = router;
