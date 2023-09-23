const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const getRecipeById = async (req, res) => {
    const { adult } = req.user;
   // const adult = false;
   // const id = req.params.recipeId;
 const recipe = await recipesModel.findById(req.params.recipeId);
 if (!recipe) {
   throw HttpError(404, 'Not found');
}
 if (recipe.alcoholic === "Alcoholic") {
    if (!adult) {
        throw HttpError(400, 'For adult only!');
    }
 }
 res.status(200).json({
    code: 200,
    message: 'Success operation',
    data: recipe,
 });
}

module.exports = getRecipeById;