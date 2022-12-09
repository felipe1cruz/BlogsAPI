const categoriesServices = require('../services/categories.services');

const createCategory = async (req, res, next) => {
  try {
    const category = await categoriesServices.createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await categoriesServices.getAllCategories();
    return res.status(200).json(allCategories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};