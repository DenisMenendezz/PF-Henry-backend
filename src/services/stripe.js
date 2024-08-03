// src/services/stripe.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPayment = async (id, amount) => {
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      description: 'Sample Payment',
      payment_method: id,
      confirm: true
    });
    return payment;
  } catch (error) {
    throw error;
  }
};

module.exports = { createPayment };
