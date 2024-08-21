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
      text: `Hola,

      Tu pago de ${amount / 100} USD ha sido procesado exitosamente.

      Gracias por tu compra!`,
    };

    await transporter.sendMail(mailOptions);

    await updateShoppingMiddleware(req, res, () => {
      res.status(200).json({ payment });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

module.exports = { stripePost };
