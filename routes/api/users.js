const express = require("express");
const router = express.Router();
const { auth, validateBody, upload } = require("../../middlewares");
const errorHandler = require("../../helpers/errorHandler");
const { users: controller } = require("../../controllers/index");
const {
  updateUserSchema,
  subscribeEmailSchema,
} = require("../../models/userModel");

router.get("/current", auth, errorHandler(controller.getCurrent));
router.patch(
  "/update",
  auth,
  validateBody(updateUserSchema),
  upload.single("avatar"),
  errorHandler(controller.updateUser)
);
router.post(
  "/subscribe",
  auth,
  validateBody(subscribeEmailSchema),
  errorHandler(controller.subscribeEmail)
);

module.exports = router;
