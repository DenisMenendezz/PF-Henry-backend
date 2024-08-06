const { createPayment } = require('../config/stripeConfig');
const stripePost = async (req, res) => {
  const { id, amount } = req.body;
  try {
    const payment = await createPayment(id, amount);
    res.status(200).json({ payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
}

module.exports = {stripePost};
