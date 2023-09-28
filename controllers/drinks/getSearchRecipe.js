const { RecipesModel } = require('../../models/RecipesModel');
const HttpError = require('../../helpers/HttpError');

const getSearchRecipe = async (req, res) => {
    const { adult } = req.user;
    const { page = 1, limit = 10 } = req.query;
    let skip = (page - 1) * limit;
    // const  adult=false;
    const keys = Object.keys(req.query);
    let paramSearch = {};
    for (const key of keys) {
        if (key === 'drink' || key === 'category' || key === 'ingredients.title') {
            paramSearch = { ...paramSearch, [key]: { $regex: new RegExp(req.query[key], "i") } }
        };
    }

    let getByCondition = { ...paramSearch, alcoholic: "Non alcoholic" };
    if (adult) { getByCondition = { ...paramSearch } };

    const resultCount = await RecipesModel.find(getByCondition).count();
    if (skip >= resultCount) { if (resultCount < limit) { skip = 0 } else { skip = resultCount - limit } }

    const recipes = await RecipesModel.find(getByCondition,
        { drink: 1, drinkThumb: 1, category: 1, alcoholic: 1, populate: 1 }, { skip, limit }).sort({ populate: -1 })

    if (!recipes || !recipes.length) {
        throw HttpError(404, "Not found, try again");
    }
    res.status(200).json({
        code: 200,
        message: 'Success operation',
        quantityPerPage: recipes.length,
        quantityTotal: resultCount,
        data: recipes,
    });
}

module.exports = getSearchRecipe;