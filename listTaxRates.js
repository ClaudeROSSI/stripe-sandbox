const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

(async () => {

    console.log('Hello!');
    const taxRates = await stripe.taxRates.list({});
  
    console.log(taxRates);

})();