const postService = require('../services/post.services');

const createPost = async (req, res, next) => {
  try {
    const newPost = req.body;
    const { id } = req.locals;
    const createdPost = await postService.createPost(id, newPost);
    return res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const allPosts = await postService.getAll();
    return res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postId = await postService.getById(id);
    return res.status(200).json(postId);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
 try {
  const userId = req.locals.id;
  const newPost = req.body;
  const { id } = req.params;
  const updatedPostid = await postService.update(id, userId, newPost);
  const updatedPost = await postService.getById(updatedPostid);
  return res.status(200).json(updatedPost);
 } catch (error) {
  next(error);
 }
};

const postDelete = async (req, res, next) => {
  try {
    const userId = req.locals.id;
    const { id } = req.params;
    await postService.postDelete(id, userId);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
 
module.exports = {
  createPost,
  getAll,
  getById,
  update,
  postDelete,
};