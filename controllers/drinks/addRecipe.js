const { recipesModel, schema } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const addRecipe = async (req, res) => {
    if (!req.file || !req.file.path) {
        throw HttpError(400, "File is required for this request");
      }
        const recipeAdd = {...req.body, drinkThumb: req.file.path, ingredients: JSON.parse(req.body.ingredients) };
        console.log('Recipe ADD', recipeAdd);
    const { error } = schema.validate(recipeAdd);
    if (error) {
        res.status(400);
        throw HttpError(400, 'Provide all fields data');
    }
    const { _id } = req.user;
    const result = await recipesModel.create({ ...recipeAdd, owner: _id });
    res.status(201).json({
        code: 201,
        message: 'success',
        data: result,
    });
};

module.exports = addRecipe;