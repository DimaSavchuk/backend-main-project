const { Schema, model } = require("mongoose");
const Joi = require("joi");
const errorMongooseHandler = require("../helpers/errorMongooseHandler");

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
  drink: Joi.string().required(),
  tags: Joi.string(),
  category: Joi.string().required(),
  alcoholic: Joi.string().required(),
  glass: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  instructionsUK: Joi.string(),
  drinkThumb: Joi.string(),
  ingredients: Joi.array().required(),
  shortDescription: Joi.string(),
});

const RecipesModel = model("recipes", recipesSchema);

module.exports = {
  RecipesModel,
  schemaAddRecipe,
};
