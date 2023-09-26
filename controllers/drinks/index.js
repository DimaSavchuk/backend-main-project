const getMainPage = require('./getMainPage');
const getRecipeById = require('./getRecipeById');
const addRecipe = require('./addRecipe');
const getOwnRecipes = require('./getOwnRecipes');
const addFavoriteRecipe = require('./addFavoriteRecipe');
const removeRecipeById = require('./removeRecipeById');
const removeFavoriteRecipe = require('./removeFavoriteRecipe');
const getFavoriteRecipes = require('./getFavoriteRecipes');
const getPopularRecipes = require('./getPopularRecipes');
const getSearchRecipe = require('./getSearchRecipe');
const getRecipesForHomePage = require('./getRecipesForHomePage');

module.exports = {
    getMainPage,
    getRecipeById,
    addRecipe,
    getOwnRecipes,
    addFavoriteRecipe,
    removeRecipeById,
    removeFavoriteRecipe,
    getFavoriteRecipes,
    getPopularRecipes,
    getSearchRecipe,
    getRecipesForHomePage
}