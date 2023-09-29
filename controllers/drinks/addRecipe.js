const { RecipesModel, schemaAddRecipe } = require("../../models/RecipesModel");
const HttpError = require("../../helpers/HttpError");

const addRecipe = async (req, res) => {
  console.log("ADDRECIPE!!!!!!!!!!!!!!!");
  if (!req.file || !req.file.path) {
    console.log(req.file);
    console.log(req.file.path);
    throw HttpError(400, "File is required for this request");
  }
  const recipeAdd = {
    ...req.body,
    drinkThumb: req.file.path,
    ingredients: JSON.parse(req.body.ingredients),
  };
  console.log(recipeAdd);
  //   console.log('Recipe ADD', recipeAdd);
  const { error } = schemaAddRecipe.validate(recipeAdd);
  if (error) {
    res.status(400);
    throw HttpError(400, "Provide all fields data");
  }
  const { _id } = req.user;
  const result = await RecipesModel.create({ ...recipeAdd, owner: _id });
  res.status(201).json({
    code: 201,
    message: "success",
    data: result,
  });
};

module.exports = addRecipe;
