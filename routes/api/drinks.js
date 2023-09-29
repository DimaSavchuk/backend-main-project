const express = require("express");
const router = express.Router();
const { schemaAddRecipe } = require('../../models/RecipesModel')
const { drinks } = require("../../controllers");
const { isValidId, isValidIdBody, auth, upload, validateBody } = require("../../middlewares");
const errorHandler = require("../../helpers/errorHandler");

router.get("/mainpage", auth, errorHandler(drinks.getMainPage));
router.get("/popular", auth, errorHandler(drinks.getPopularRecipes));
router.get("/search", auth, errorHandler(drinks.getSearchRecipe));

router.get("/own", auth, errorHandler(drinks.getOwnRecipes));
router.post("/own/add", auth, upload.single("cocktail"), validateBody(schemaAddRecipe),
  errorHandler(drinks.addRecipe));
router.delete("/own/remove", auth, isValidIdBody, errorHandler(drinks.removeRecipeById));

router.get("/favorite", auth, errorHandler(drinks.getFavoriteRecipes));
router.post("/favorite/add", auth, isValidIdBody, errorHandler(drinks.addFavoriteRecipe));
router.delete("/favorite/remove", auth, isValidIdBody, errorHandler(drinks.removeFavoriteRecipe));

router.get("/homepage", auth, errorHandler(drinks.getRecipesForHomePage));
router.get("/:recipeId", auth, isValidId, errorHandler(drinks.getRecipeById));

module.exports = router;
