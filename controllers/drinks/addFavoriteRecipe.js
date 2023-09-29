const { RecipesModel } = require('../../models/RecipesModel');
const  HttpError = require('../../helpers/HttpError');

const addFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;
    const recipe = await RecipesModel.findById(recipeId);
    const idx = recipe.favorites.findIndex(elem => elem === userId );
    if ( idx < 0) { recipe.favorites.push(userId);
        if (recipe.populate) { recipe.populate +=1 } else {recipe.populate =1}
        await recipe.save() } else {
            throw HttpError(404, 'Сocktail has already been added!');
        }
    res.status(201).json({
        code: 201,
        message: 'Success operation',
        data: recipe,
    });
};

module.exports = addFavoriteRecipe;