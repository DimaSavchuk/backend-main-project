const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/HttpError");

const isValidIdBody = (req, res, next) => {
  const { recipeId } = req.body;

  if (!isValidObjectId(recipeId)) {
    next(HttpError(404, "Not valid id."));
  }
  next();
};

module.exports = isValidIdBody;
