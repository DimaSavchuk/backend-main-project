const { recipesModel } = require('../../models/recipesModel');
const  HttpError = require('../../helpers/HttpError');

const getMainPage = async (req, res) => {
   const { adult } = req.user;
    // const adult = false;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    let getByCondition = { alcoholic: "Non alcoholic" };
    if (adult) { getByCondition = {} };
const categories = await recipesModel.distinct("category");
let test = [];
for (const item of categories) {
   const qq=await recipesModel.find({category:item}).count()
  // console.log(qq, item)
    test.push({category:item, qq })
} 
// console.log('Categories', typeof(categories), test);
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
    data: test
 });
}

module.exports = getMainPage;