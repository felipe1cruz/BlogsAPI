const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/user', userController.createUser);

router.get('/user/:id', auth, userController.getUserId);

router.get('/user', auth, userController.getAllUsers);

router.delete('/user/me', auth, userController.userDelete);

module.exports = router;