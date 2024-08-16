const { borrarUserController } = require("../controllers/borrarController");

const borrarUserHandler = async (req, res) => {
  const { idUser } = req.params;

  try {
    const user = await borrarUserController(idUser);

    res.json({
      message: "Su usuario se borro exitosamente",
      user: user,
    });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  borrarUserHandler,
};
