const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const removeRecipeById = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;
    const checkOwnerRecipe = await recipesModel.find({$and:[{_id: recipeId},{owner: userId}]});
    if (!checkOwnerRecipe.length) {
        throw HttpError(404, 'Not found');
    }
    const result = await recipesModel.findByIdAndRemove(checkOwnerRecipe[0].id);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json({
        code: 200,
        message: 'Success operation',
        data: result,
    })
};

module.exports = removeRecipeById;