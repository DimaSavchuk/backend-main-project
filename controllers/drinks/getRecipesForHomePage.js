const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const getRecipesForHomePage = async (req, res) => {
   const { adult } = req.user;
    // const adult = false;

    let getByCondition = { alcoholic: "Non alcoholic" };
    if (adult) { getByCondition = {} };

const categories = await recipesModel.distinct("category");
const homeList = [];
let itemCount = 0;

for (const item of categories) {
   const drinks=await recipesModel.find({ $and:[ {category:item}, getByCondition ]}, {drink:1, drinkThumb:1}).limit(3)
    itemCount = itemCount + drinks.length;
  if (drinks.length) {
    homeList.push({category:item, drinks})
    }
}
 const totalCount = await recipesModel.count();
 if (!homeList.length) {
   throw HttpError(404, 'Not found');
}
 res.status(200).json({
    code: 200,
    message: 'Success operation',
    totalRecipes: totalCount,
    itemCountInSelection: itemCount,
    quantityCategories: homeList.length,
    data: homeList
 });
}

module.exports = getRecipesForHomePage;
