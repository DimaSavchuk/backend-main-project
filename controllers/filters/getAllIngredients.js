const HttpError = require("../../helpers/HttpError");
const { IngredientsModel } = require("../../models/IngredientsModel");

const getAllIngredients = async (req, res) => {
  const ingredients = await IngredientsModel.find({}).sort({ title: 1 });
  if (!ingredients) {
    throw HttpError(404, "Not Found");
  }
  res.json(ingredients);
};

module.exports = getAllIngredients;
