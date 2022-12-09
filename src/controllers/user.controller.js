const userService = require('../services/user.services');

const createUser = async (req, res, next) => {
  try {
    const token = await userService.createUser(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const AllUsers = await userService.getAllUsers();
    
    return res.status(200).json(AllUsers);
  } catch (error) {
    next(error);
  }
};

const getUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = await userService.getUserId(id);
    return res.status(200).json(userId);
  } catch (error) {
    next(error);
  }
};

const userDelete = async (req, res, next) => {
  try {
    const userId = req.locals.id;
    await userService.userDelete(userId);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserId,
  userDelete,
};