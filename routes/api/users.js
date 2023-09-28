const express = require("express");
const auth = require("../../middlewares/auth");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();
const errorHandler = require("../../helpers/errorHandler");
const upload = require("../../middlewares/upload");

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
