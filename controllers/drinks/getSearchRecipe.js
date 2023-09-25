const { recipesModel } = require('../../models/recipesModel');
const HttpError = require('../../helpers/HttpError');

const getSearchRecipe = async (req, res) => {
    const { adult } = req.user;
    console.log('req body', req.body);
    // const  adult=false;
    let getByCondition = { ...req.body, alcoholic: "Non alcoholic" };
    if (adult) { getByCondition = { ...req.body } };

    // const recipes = await recipesModel.find({ $or:[{...req.body}]});
     const recipes = await recipesModel.find(getByCondition);
      //  {drink:1, category:1,alcoholic:1, populate:1}).sort({populate:-1})

    if (!recipes || !recipes.length) {
        throw HttpError(404, "Not found, try again");
    }
    res.status(200).json({
        code: 200,
        message: 'Success operation',
        count: recipes.length,
        data: recipes,
    });
}

module.exports = getSearchRecipe;