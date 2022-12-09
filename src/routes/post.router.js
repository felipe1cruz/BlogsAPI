const express = require('express');
const postController = require('../controllers/post.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.put('/post/:id', auth, postController.update);

router.post('/post', auth, postController.createPost);

router.get('/post/:id', auth, postController.getById);

router.get('/post', auth, postController.getAll);

router.delete('/post/:id', auth, postController.postDelete);

module.exports = router;