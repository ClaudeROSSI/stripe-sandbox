const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(async () => {
  console.log('Hello!');

  const stripe = require('stripe')('sk_test_51KahQwCZ2QnaIWxgCicdLYitYUa7As7sjlSpIitZOnDcoCuLCiRBrn9lQ33ClcT85nthZ7pcXEKWkXmp0tiJu9BY00jDQml52h');

  const accounts = await stripe.accounts.list({
    limit: 10,
  });

  for (const account of accounts.data) {
    console.log("Now killing account ID: " + account.id);
    stripe.accounts.del(
      account.id
    ).then(() => {
      console.log("Done");
    });
  };
 
})();