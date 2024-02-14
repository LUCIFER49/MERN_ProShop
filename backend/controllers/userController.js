import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  res.send("Auth user");
});

// @desc     Register user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc     Logout user / clear cookie
// @route    POST /api/users/logout
// @access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc     Get User Profile
// @route    GET /api/users/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

// @desc     Update User Profile
// @route    PUT /api/user/profile
// @access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

// @desc     Get users
// @route    GET /api/users
// @access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});


// @desc     Get User by ID
// @route    GET /api/users/:id
// @access   Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    res.send("get user by id");
});

// @desc     Delete user
// @route    DELETE /api/users/:id
// @access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

// @desc     Update user
// @route    PUT /api/users/:id
// @access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserByID, updateUser }