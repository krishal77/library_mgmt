import User from '../models/userModel.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// @desc    Get all users
// @route   GET /api/users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Users retrieved successfully', users);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }
    return sendSuccess(res, 'User retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new user
// @route   POST /api/users
export const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, role } = req.body;

    if (!name || !email) {
      return sendError(res, 'Name and email are required fields', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 'User with this email already exists', 400);
    }

    const newUser = await User.create({ name, email, phone, role });
    return sendSuccess(res, 'User created successfully', newUser, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, 'User updated successfully', updatedUser);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    return sendSuccess(res, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};
