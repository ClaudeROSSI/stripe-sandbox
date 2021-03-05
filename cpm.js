const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

(async () => {

    const paymentMethods = await stripe.paymentMethods.list({
        customer: 'cus_J3IeYn9INtfXzV',
        type: 'card',
    });

      
    console.log(paymentMethods);
})();