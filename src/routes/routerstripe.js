const { Router } = require('express');
const { createPayment } = require('../services/stripe');

const router = Router();

router.post('/checkout', async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await createPayment(id, amount);
    console.log(payment);
    res.send({ message: 'Successful payment', payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
});

module.exports = router;
