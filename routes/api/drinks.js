const express = require("express");
const router = express.Router();
const { drinks } = require("../../controllers/index");
const auth = require("../../middlewares/auth");
const errorHandler = require("../../helpers/errorHandler");

router.get("/mainpage", auth, errorHandler(drinks.getMainPage));
router.get("/byid/:recipeId", auth, errorHandler(drinks.getRecipeById));
router.get("/own", auth, errorHandler(drinks.getOwnRecipes));
router.post("/own/add", auth, errorHandler(drinks.addRecipe));
router.delete("/own/remove", auth, errorHandler(drinks.removeRecipeById));
router.get("/favorite", auth, errorHandler(drinks.getFavoriteRecipes));
router.post("/favorite/add", auth, errorHandler(drinks.addFavoriteRecipe));
router.delete("/favorite/remove", auth, errorHandler(drinks.removeFavoriteRecipe));

module.exports = router;