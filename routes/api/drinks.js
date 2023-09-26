const express = require("express");
const router = express.Router();
const { drinks } = require("../../controllers/index");
const auth = require("../../middlewares/auth");
const errorHandler = require("../../helpers/errorHandler");
const upload = require("../../middlewares/upload");
// const { getIngredients } = require("../../controllers/uploadFile");

// router.get("/cloudinary", errorHandler(getIngredients));

router.get("/mainpage", auth, errorHandler(drinks.getMainPage));
router.get("/byid/:recipeId", auth, errorHandler(drinks.getRecipeById));
router.get("/popular", auth, errorHandler(drinks.getPopularRecipes));
router.get("/search", auth, errorHandler(drinks.getSearchRecipe));
router.get("/own", auth, errorHandler(drinks.getOwnRecipes));
router.post(
  "/own/add",
  auth,
  upload.single("cocktail"),
  errorHandler(drinks.addRecipe)
);
router.delete("/own/remove", auth, errorHandler(drinks.removeRecipeById));
router.get("/favorite", auth, errorHandler(drinks.getFavoriteRecipes));
router.post("/favorite/add", auth, errorHandler(drinks.addFavoriteRecipe));

router.delete(
  "/favorite/remove",
  auth,
  errorHandler(drinks.removeFavoriteRecipe)
);
router.get("/homepage", auth, errorHandler(drinks.getRecipesForHomePage));


module.exports = router;
