const Joi = require('joi');
const { Category } = require('../models');
const errorGenerate = require('../utils/genericErrorHandler');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const createCategory = async (name) => {
  const { error } = categorySchema.validate(name);
  if (error) {
    throw errorGenerate(400, error.message);
  }

  const newCategory = await Category.create(name);
  return newCategory;
};

const getAllCategories = () => {
  const allCategories = Category.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
  return allCategories;
};

module.exports = {
  createCategory,
  getAllCategories,
};