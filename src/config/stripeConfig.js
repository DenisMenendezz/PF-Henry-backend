const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//registrar el pago
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

//En la doc de stripe
// const paymentIntent = await stripe.paymentIntents.create({
//   amount: 2099,
//   currency: 'usd',
//   payment_method: 'pm_card_authenticationRequired',
//   confirm: true,
//   off_session: true,
// });

// Manejo de errores:
// async function exampleFunction(args) {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create(args);
//     console.log('No error.');
//   } catch (e) {
//     switch (e.type) {
//       case 'StripeCardError':
//         console.log(`A payment error occurred: ${e.message}`);
//         break;
//       case 'StripeInvalidRequestError':
//         console.log('An invalid request occurred.');
//         break;
//       default:
//         console.log('Another problem occurred, maybe unrelated to Stripe.');
//         break;
//     }
//   }
// }