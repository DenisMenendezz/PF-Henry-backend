const transporter = require("../config/nodemailerConfig");
const { createPayment } = require("../config/stripeConfig");
const updateShoppingMiddleware = require("../middleware/updateShopping");

const stripePost = async (req, res) => {
  const { id, amount, email, cartItems } = req.body;
  try {
    const payment = await createPayment(id, amount);

    const mailOptions = {
      from: process.env.EMAIL_USER, // Debería ser tu correo electrónico
      to: email, // El correo electrónico del destinatario
      subject: "Compra realizada exitosamente",
      html: `
      <p>¡Gracias por realizar tu compra en Champion Gear!</p>
      <a href="https://proyecto-final-henry-pearl.vercel.app/home" target="_blank">
        <img src="cid:logo" alt="Champion Gear Logo" style="display:block;" />
      </a>
    `,
    attachments: [{
      filename: 'logo.png',
      path: 'https://res.cloudinary.com/dbveu2rga/image/upload/v1724291204/championgear_bg32op.webp',
      cid: 'logo' // Identificador del contenido
    }]
    };

    await transporter.sendMail(mailOptions);

    await updateShoppingMiddleware(req, res, () => {});

    res.status(200).json({ payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

module.exports = { stripePost };
