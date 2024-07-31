const { User } = require("../db");

const createUserController = async (email, role) => {
  try {
    const newUser = await User.create({
      email,
      role,
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByIdController = async (email) => {
  try {
    const user = await User.findByPk(email);
    if (!user) {
      throw new Error("The user doesn`t exist");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUserController,
  getUserByIdController,
};
