require('dotenv').config();
console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Registrar el pago
const createPayment = async (id, amount) => {
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Sample Payment",
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });
    return payment;
  } catch (error) {
    throw error;
  }
};

module.exports = { createPayment };
