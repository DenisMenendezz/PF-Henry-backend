const {
  createUserController,
  getUserByIdController,
} = require("../controllers/userControllers");

const createUserHandler = async (req, res) => {
  try {
    const { uid, email, role } = req.body;

    if (!uid || !email || !role) {
      return res
        .status(400)
        .json({ message: "UID, email, and role are required" });
    }

    const newUser = await createUserController(uid, email, role);
    res.status(201).json({
      message: "The user has been created successfully",
      user: newUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getHandlerByIdUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await getUserByIdController(uid);

    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createUserHandler,
  getHandlerByIdUser,
};
