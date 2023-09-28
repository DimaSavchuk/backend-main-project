const { RecipesModel } = require('../../models/RecipesModel');
const HttpError = require('../../helpers/HttpError');

const getPopularRecipes = async (req, res) => {
    const { adult } = req.user;
   // const  adult  = false;
    let getByCondition = { populate: {$gte : 0}, alcoholic: "Non alcoholic" };
    if (adult) { getByCondition = { populate: {$gte : 0} } };

    const recipes = await RecipesModel.find(getByCondition, 
        {drink:1, category:1,alcoholic:1, populate:1, description:1, drinkThumb:1 }).sort({populate:-1})

    if (!recipes) {
        throw HttpError(404, "No popular recipes yet");
    }
    res.status(200).json({
        code: 200,
        message: 'Success operation',
        data: recipes,
    });
}

module.exports = getPopularRecipes;