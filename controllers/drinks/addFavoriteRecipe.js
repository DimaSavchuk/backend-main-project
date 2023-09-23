const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const addFavoriteRecipe = async (req, res) => {
    const { recipeId } = req.body;
    const userId = req.user.id;
    // const  userId  ="650c58ce53146d03476d1d1c"
    const recipe = await recipesModel.findById(recipeId);
    const idx = recipe.favorites.findIndex(elem => elem === userId );
    if ( idx < 0) { recipe.favorites.push(userId);
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