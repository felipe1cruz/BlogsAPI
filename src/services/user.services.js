const Joi = require('joi');
const { User } = require('../models');
const errorGenerate = require('../utils/genericErrorHandler');
const JWT = require('../utils/JWT');

const userSchema = Joi.object({
  displayName: Joi.string().required().min(8),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  image: Joi.string(),

});

const createUser = async ({ displayName, email, password, image }) => {
  const { error } = userSchema.validate({ displayName, email, password, image });
  if (error) {
    throw errorGenerate(400, error.message);
  }

  const checkCreatedUsers = await User.findOne({
    where: {
      email,
    },
  });

  if (checkCreatedUsers) {
    throw errorGenerate(409, 'User already registered');
  }
  const newUser = await User.create({ displayName, email, password, image });
  
  const token = JWT.generateToken(newUser.dataValues);
  return token;
};

const getAllUsers = () => {
  const AllUsers = User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  return AllUsers;
};

const getUserId = async (id) => {
    const userId = await User.findOne({
    attributes: {
      exclude: ['password'],
    },
    where: { id },
  });
  if (!userId) {
    throw errorGenerate(404, 'User does not exist');
  }
  return userId;
};

const userDelete = async (userId) => {
  await getUserId(userId);

  const deletedUser = await User.destroy({
    where: { id: userId },
  });
  return deletedUser;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserId,
  userDelete,
};