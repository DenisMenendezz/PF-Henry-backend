const {
  createUserController,
  getUserByIdController,
} = require("../controllers/userControllers");

const createUserHandler = async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ message: "Email and role are required" });
    }

    const newUser = await createUserController(email, role);
    res.status(201).json({
      message: "The user has been created successfully",
      user: newUser,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getHandlerByIdUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await getUserByIdController(email);

    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createUserHandler,
  getHandlerByIdUser,
};
