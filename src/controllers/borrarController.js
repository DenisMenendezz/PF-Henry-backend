const { User } = require("../db");

const borrarUserController = async (idUser) => {
  try {
    const user = await User.findByPk(idUser);
    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  borrarUserController,
};
