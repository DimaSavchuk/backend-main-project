const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const getFavoriteRecipes = async (req, res) => {
    const userId = req.user.id;
    const recipes = await recipesModel.find({ favorites: userId });
    if (!recipes) {
        throw HttpError(404, "User haven't favorite recipes yet");
    }
    res.status(200).json({
        code: 200,
        message: 'Success operation',
        data: recipes,
    });
}

module.exports = getFavoriteRecipes;