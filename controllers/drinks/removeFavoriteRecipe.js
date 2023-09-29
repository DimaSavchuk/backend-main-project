const { RecipesModel } = require('../../models/RecipesModel');
const  HttpError = require('../../helpers/HttpError');

const removeFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
     const userId = req.user.id;

    const recipe = await RecipesModel.findById(recipeId);

    console.log('remove favor recipe',recipe);
    if (!recipe) {
        throw HttpError(404, 'Not found');
    }
    const idx = recipe.favorites.findIndex(elem => elem === userId );
    if ( idx < 0) { throw HttpError(404, 'Сocktail has already been deleted from favorite!') } 
        else { recipe.favorites.splice(idx,1);
               await recipe.save() };
    res.status(201).json({
        code: 201,
        message: 'success',
        data: recipe,
    });
};

module.exports = removeFavoriteRecipe;