const JWTUTILS = require('../utils/JWT');
const errorGenerate = require('../utils/genericErrorHandler');

const authmiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const status = 401;
      const message = 'Token not found';
      throw errorGenerate(status, message);
    }
    const user = await JWTUTILS.authenticateToken(authorization);
    if (!user) {
      const status = 401;
      const message = 'Expired or invalid token';
      throw errorGenerate(status, message);
    }
    req.locals = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authmiddleware;