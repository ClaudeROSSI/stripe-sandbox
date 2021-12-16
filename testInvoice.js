const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(async () => {
  console.log('Hello!');
  // const invoices = await stripe.invoices.list({
  //   limit: 1
  // });
  // console.log(invoices.data[0].number);

  // const stripeInvoiceItems = await stripe.invoiceItems.list({
  //   invoice: invoices.data[0].id
  // });


  const invoice = await stripe.invoices.retrieve( 'in_1JygWvItOayzSu79brDYgddK');

  const stripeInvoiceItems = await stripe.invoiceItems.list({
    invoice: invoice.id
  });

  for (const stripeInvoiceItem of stripeInvoiceItems.data) {
    if (stripeInvoiceItem.metadata) {
      console.log(stripeInvoiceItem.metadata);
    }
  }


 
})();