const jwt = require('jsonwebtoken');
const errorGenerate = require('./genericErrorHandler');

const JWT_SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: '20d',
    algorithm: 'HS256',  
  };

  const token = jwt.sign(user, JWT_SECRET, jwtConfig);

  return token;
};

const authenticateToken = async (token, _next) => {
  if (!token) {
    const status = 401;
    const message = 'missing token';
    throw errorGenerate(status, message);
  } 
  try {
    const validateToken = await jwt.verify(token, JWT_SECRET);
    return validateToken;
  } catch (error) {
    const status = 401;
    const message = 'Expired or invalid token';
    throw errorGenerate(status, message);
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};