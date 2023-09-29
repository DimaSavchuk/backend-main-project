const { Schema, model } = require("mongoose");
const Joi = require("joi");
const errorMongooseHandler = require("../helpers/errorMongooseHandler");

const alcoholList = ['Alcoholic','Non alcoholic','Optional alcohol'];
const categoriesList = ["Beer", "Cocktail", "Cocoa", "Coffee / Tea", "Coffee/Tea", "Homemade Liqueur",
  "Ordinary Drink", "Other/Unknown", "Punch / Party Drink", "Shake", "Shot", "Soft Drink"];
const glassList = ["Beer", "Cocktail", "Cocoa", "Coffee / Tea", "Coffee/Tea", "Homemade Liqueur", "Ordinary Drink",
  "Other/Unknown", "Punch / Party Drink", "Shake", "Shot", "Soft Drink"];

const recipesSchema = new Schema(
  {
    drink: {
      type: String,
    },
    drinkAlternate: {
      type: String,
    },
    tags: {
      type: String,
    },
    video: {
      type: String,
    },
    category: {
      type: String,
    },
    IBA: {
      type: String,
    },
    alcoholic: {
      type: String,
    },
    glass: {
      type: String,
    },
    description: {
      type: String,
    },
    instructions: {
      type: String,
    },
    instructionsES: {
      type: String,
    },
    instructionsDE: {
      type: String,
    },
    instructionsFR: {
      type: String,
    },
    instructionsIT: {
      type: String,
    },
    instructionsRU: {
      type: String,
    },
    instructionsPL: {
      type: String,
    },
    instructionsUK: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    ingredients: {
      type: Array,
          title:{
            type: String,
          },
          measure:{
            type: String,
          },
          ingredientId: {
            type: Schema.Types.ObjectId,
            ref: "ingredient",
          },
    },
    favorites: {
      type: Array,
    },
    populate: {
      type: Number,
    },
    shortDescription: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

recipesSchema.post("save", errorMongooseHandler);

const schemaAddRecipe = Joi.object({
  drink: Joi.string().min(1).required().messages({
    'string.base' : 'Drink should be a type of string',
    'string.empty' : 'The drink field isnt be empty',
    'string.min': 'Drink should have a minimum length of {#limit} characters.',
    'any.required': 'Drink is a required field.',
  }),
  tags: Joi.string().messages({
    'string.base' : 'Tags should be a type of string',
  }),
  category: Joi.string().valid(...categoriesList).required().messages({
    'string.base' : 'Category should be a type of string',
    'any.required': 'Category is a required field.'
  }),
  alcoholic: Joi.string().valid(...alcoholList).required().messages({
    'string.base' : 'Alcoholic type should be a type of string',
    'any.required': 'Alcoholic type is a required field.'
  }),
  glass: Joi.string().valid(...glassList).required().messages({
    'string.base' : 'Glass should be a type of string',
    'any.required': 'Glass is a required field.'
  }),
  description: Joi.string().required().messages({
    'string.base' : 'Description should be a type of string',
    'any.required': 'Description is a required field.'
  }),
  instructions: Joi.string().required().messages({
    'string.base' : 'Instructions should be a type of string',
    'any.required': 'Instructions is a required field.'
  }),
  instructionsUK: Joi.string().messages({
    'string.base' : 'InstructionsUK should be a type of string',
  }),
  drinkThumb: Joi.string(),
  ingredients: Joi.string(),
  shortDescription: Joi.string().messages({
    'string.base' : 'Short description should be a type of string',
  }),
});

const RecipesModel = model("recipes", recipesSchema);

module.exports = {
  RecipesModel,
  schemaAddRecipe,
};
