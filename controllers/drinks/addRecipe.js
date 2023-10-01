const { RecipesModel } = require('../../models/RecipesModel');
const { UserModel } = require('../../models/UserModel');
const  HttpError = require('../../helpers/HttpError');

const addRecipe = async (req, res) => {

    if (!req.file || !req.file.path) {
        throw HttpError(400, "File is required for this request");
      }
        const recipeAdd = {...req.body, drinkThumb: req.file.path, ingredients: JSON.parse(req.body.ingredients) };
    const { _id } = req.user;
    const result = await RecipesModel.create({ ...recipeAdd, owner: _id });
    const user = await UserModel.find({_id:_id});
    const firstRecipeAnswer = user.firstRecipe;
    if (user.firstRecipe) { user.firstRecipe = false; }
    await user.save();

    res.status(201).json({
        code: 201,
        message: 'success',
        firstRecipe: firstRecipeAnswer,
        data: result,
    });
};

module.exports = addRecipe;