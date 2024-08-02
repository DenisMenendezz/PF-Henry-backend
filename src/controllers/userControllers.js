const { User } = require("../db");

const createUserController = async (uid, email, role) => {
  try {
    const newUser = await User.create({
      uid,
      email,
      role,
    });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByIdController = async (uid) => {
  try {
    const user = await User.findByPk(uid);
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
