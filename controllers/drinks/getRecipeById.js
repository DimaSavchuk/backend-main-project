const { RecipesModel } = require("../../models/RecipesModel");
const { IngredientsModel } = require("../../models/IngredientsModel");
const HttpError = require("../../helpers/HttpError");

const getRecipeById = async (req, res) => {
  const { adult } = req.user;

  let getByCondition = { alcoholic: "Non alcoholic" };
  if (adult) {
    getByCondition = {};
  }

  const recipe = await RecipesModel.find(
    { $and: [{ _id: req.params.recipeId }, getByCondition] },
    {
      instructionsDE: 0,
      instructionsES: 0,
      instructionsFR: 0,
      instructionsIT: 0,
      instructionsRU: 0,
      instructionsPL: 0,
    }
  );

  for (let i = 0; i < recipe[0].ingredients.length; i += 1) {
    const temp = await IngredientsModel.find(
      { _id: recipe[0].ingredients[i].ingredientId },
      { title: 1, ingredientThumb: 1, "thumb-medium": 1, "thumb-small": 1 }
    );
    recipe[0].ingredients[i] = {
      ...recipe[0].ingredients[i],
      ingredientThumb: temp[0]._doc.ingredientThumb,
      thumbMedium: temp[0]._doc["thumb-medium"],
      thumbSmall: temp[0]._doc["thumb-small"],
    };
  }

  if (!recipe.length) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    code: 200,
    message: "Success operation",
    idCurrentUser: req.user.id,
    data: recipe,
  });
};

module.exports = getRecipeById;
