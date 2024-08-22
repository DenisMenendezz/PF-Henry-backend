const {
  createUserController,
  getUserByIdController,
} = require("../controllers/userControllers");
const transporter = require("../config/nodemailerConfig")
const {User} = require('../db')


const createUserHandler = async (req, res) => {
  try {
    const { uid, email, role } = req.body;
    
    if (!uid || !email || !role) {
      return res.status(400).json({ message: "UID, email, and role are required" });
    }

    // Verificar si el usuario ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists, please log in." });
    }

    // Crear un nuevo usuario
    const newUser = await createUserController( uid, email, role );

    // Enviar correo de bienvenida
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Champion Gear!',
      html: `
        <p>¡Gracias por registrarte en Champion Gear!</p>
        <a href="https://proyecto-final-henry-pearl.vercel.app/" target="_blank">
          <img src="https://res.cloudinary.com/dbveu2rga/image/upload/v1724291204/championgear_bg32op.webp" alt="Champion Gear Logo" style="display:block;" />
        </a>
      `
    });

    res.status(201).json({
      message: "The user has been created successfully and a welcome email has been sent.",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  createUserHandler 
};
