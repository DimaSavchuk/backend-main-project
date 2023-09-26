const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const getMainPage = async (req, res) => {
   const { adult } = req.user;
    // const adult = false;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    let getByCondition = { alcoholic: "Non alcoholic" };
    if (adult) { getByCondition = {} };

 const totalCount = await recipesModel.count();
 const drinks = await recipesModel.find(getByCondition,"",{skip,limit}).sort({category:1});
 if (!drinks) {
   throw HttpError(404, 'Not found');
}
 res.status(200).json({
    code: 200,
    message: 'Success operation',
    totalRecipes: totalCount,
    quantity: drinks.length,
    data: drinks
 });
}

module.exports = getMainPage;
