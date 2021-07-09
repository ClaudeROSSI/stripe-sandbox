const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(async () => {
  console.log('Hello!');
  const customers = await stripe.customers.list({
    limit: 1,
    // email: 'claude.rossi@gmail.com'
    email: 'basic-claude.rossi@sap.com'
  });
  console.log(customers);
  const customer = await stripe.customers.retrieve(customers.data[0].id);
  console.log(customer);
  console.log("XXXXX" + customer.preferred_locales[0]);
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