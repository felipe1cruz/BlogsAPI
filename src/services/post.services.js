const Joi = require('joi');
const { Op } = require('sequelize');
const { BlogPost, Category, PostCategory, User } = require('../models');
const errorGenerate = require('../utils/genericErrorHandler');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),

});

const updateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const checkcategoryIds = async (idsArray) => {
  const categories = await Promise.all(idsArray.map(async (id) => {
    const find = await Category.findOne({
      where: id,
    }); 
    if (!find) {
      throw errorGenerate(400, '"categoryIds" not found');
    }
    return find;
}));
  if (categories.some((category) => !category)) {
    throw errorGenerate(400, '"categoryIds" not found');
  }
  return categories;
};

const createPost = async (id, newPost) => {
  const { title, content, categoryIds } = newPost;
  const { error } = postSchema.validate({ title, content, categoryIds });
  if (error) {
    throw errorGenerate(400, 'Some required fields are missing');
  }

  await checkcategoryIds(categoryIds);

  const post = await BlogPost.create({ 
    title, 
    content, 
    userId: id, 
    updated: Date.now(), 
    published: Date.now(), 
  });

  await Promise.all(categoryIds.map((categoryId) => 
    PostCategory.create({ postId: post.id, categoryId })));

  return post;
};

const getAll = async () => {
    const allPosts = await BlogPost.findAll({
      include:
       [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
       ],
  });
  return allPosts;
};

const getById = async (id) => {
  const postId = await BlogPost.findOne({
    include:
    [
     { model: User, as: 'user', attributes: { exclude: ['password'] } },
     { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    where: { id },
  });
  if (!postId) {
    throw errorGenerate(404, 'Post does not exist');
  }
  return postId;
};

const update = async (id, userId, newPost) => {
  const { title, content } = newPost;
  const { error } = updateSchema.validate({ title, content });
  if (error) {
    throw errorGenerate(400, 'Some required fields are missing');
  }
  await getById(id);

  const [updatedPost] = await BlogPost.update(
    { title, content, updated: new Date() },
    { where: {
      [Op.and]: [{ id }, { userId }],
    } },
  );
  if (!updatedPost) throw errorGenerate(401, 'Unauthorized user');
  return updatedPost;
};

const postDelete = async (id, userId) => {
  await getById(id);

  const deletedPost = await BlogPost.destroy(
    { where: { [Op.and]: [{ id }, { userId }] } },
  );
  if (!deletedPost) throw errorGenerate(401, 'Unauthorized user');
  return deletedPost;
};

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  postDelete,
};