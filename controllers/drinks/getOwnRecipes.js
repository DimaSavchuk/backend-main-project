const { RecipesModel } = require('../../models/RecipesModel');
const  HttpError = require('../../helpers/HttpError');

const getOwnRecipes = async (req, res) => {
    const { _id } = req.user;
 const recipes = await RecipesModel.find({owner: _id},
   {drink:1, alcoholic:1, description:1, drinkThumb:1 });
 if (!recipes) {
    throw HttpError(404, "User haven't recipes yet");
 }
 res.status(200).json({
    code: 200,
    message: 'Success operation',
    data: recipes,
 });
}

module.exports = getOwnRecipes;