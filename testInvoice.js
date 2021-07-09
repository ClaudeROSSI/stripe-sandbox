const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(async () => {
  console.log('Hello!');
  const invoices = await stripe.invoices.list({
    limit: 1
  });
  console.log(invoices);
 
})();