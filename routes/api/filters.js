const express = require("express");
const router = express.Router();

const { auth } = require("../../middlewares");

const {
  getAllCategories,
  getAllIngredients,
  getAllGlasses,
} = require("../../controllers/filters");

router.get("/categories", auth, getAllCategories);
router.get("/ingredients", auth, getAllIngredients);
router.get("/glasses", auth, getAllGlasses);

module.exports = router;
