const { recipesModel } = require('../../models/recipesModel');
const { ingredientsModel } = require('../../models/ingredientsModel')
const  HttpError = require('../../helpers/HttpError');

const getRecipeById = async (req, res) => {
    const { adult } = req.user;
  // const adult = false;
   let getByCondition = { alcoholic: "Non alcoholic" };
   if (adult) { getByCondition = {} };

 const recipe = await recipesModel.find({ $and:[ {_id:req.params.recipeId}, getByCondition ]},{
   instructionsDE:0, instructionsES:0, instructionsFR:0, instructionsIT:0, instructionsRU:0, instructionsPL:0});

// for (const item of tempResult) {
//    ingredientsThumbLink.push(await ingredientsModel.find({_id:item.ingredientId},
//       { title:1, ingredientThumb:1, 'thumb-medium':1, 'thumb-small':1 }))
// }
for (let i=0; i<recipe[0].ingredients.length; i+=1) {
  const temp = await ingredientsModel.find({_id:recipe[0].ingredients[i].ingredientId},
      { title:1, ingredientThumb:1, 'thumb-medium':1, 'thumb-small':1 });
   recipe[0].ingredients[i]= { ...recipe[0].ingredients[i],
      ingredientThumb: temp[0]._doc.ingredientThumb,
      thumbMedium: temp[0]._doc['thumb-medium'],
      thumbSmall: temp[0]._doc['thumb-small']
   };
}

 if (!recipe.length) { throw HttpError(404, 'Not found') };

 res.status(200).json({
    code: 200,
    message: 'Success operation',
    idCurrentUser: req.user.id,
    data: recipe,
 });
}

module.exports = getRecipeById;