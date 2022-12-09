const authService = require('../services/auth.services');

const auth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const authenticate = await authService.authenticate(email, password);
    return res.send(authenticate);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
};