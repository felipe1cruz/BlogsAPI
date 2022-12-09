const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', authController.auth);

router.use((err, req, res, _next) => {
  const { status, message } = err;
  if (status) return res.status(status).json({ message });
  return res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = router;