const Joi = require('joi');
const errorGenerate = require('../utils/genericErrorHandler');
const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const authenticate = async (userEmail, userPassword) => {
  const { error } = userSchema.validate({ email: userEmail, password: userPassword });
  if (error) {
    const status = 400;
    const message = 'Some required fields are missing';

    throw errorGenerate(status, message);
  }
  const user = await User.findOne({
    attributes: ['id', 'display_name', 'email'],
    where: { email: userEmail, password: userPassword },
  });

  if (!user) {
    const status = 400;
    const message = 'Invalid fields';

    throw errorGenerate(status, message);
  }

  const token = generateToken(user.dataValues);

  return { token };
};

module.exports = {
  authenticate,
};