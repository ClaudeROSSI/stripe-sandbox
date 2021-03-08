const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(async () => {
  console.log('Hello!');
  const customers = await stripe.customers.list({
    limit: 1,
    email: 'claude.rossi@sap.com'
  });
  console.log(customers);
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customers.data[0].id,
    type: 'card',
  });
  console.log('Payment Methods .....'); 
  console.log(paymentMethods);
  
  console.log('CARDS Information ......................');
  paymentMethods.data.forEach(paymentMethod => {
    console.log("Card: ................................");
    console.log(paymentMethod.card);
  });
  
})();