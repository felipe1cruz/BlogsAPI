const express = require('express');
const CategoriesController = require('../controllers/categories.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/categories', auth, CategoriesController.createCategory);

router.get('/categories', auth, CategoriesController.getAllCategories);

router.use((err, req, res, _next) => {
  const { status, message } = err;
  if (status) return res.status(status).json({ message });
  return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;