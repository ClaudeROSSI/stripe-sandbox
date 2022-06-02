const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(async () => {
  console.log('Hello!');
  const invoices = await stripe.invoices.list({
    status: "paid",
    limit: 1
  });

  const invoice = invoices.data[0];
  console.log('ID '+invoice.id);
  console.log('Number: ' + invoice.number);
  console.log('Amount: ' + (invoice.amount_due/100));

  const expandedInvoice = await stripe.invoices.retrieve(invoice.id, {
    expand: ['charge', 'payment_intent'],
  });
  console.log('ID: ' + expandedInvoice.id);
  console.log('charge ID: ' + expandedInvoice.charge.id);
  console.log('Payment intent ID: ' + expandedInvoice.payment_intent.id);
  // console.log('INVOICE: ' + JSON.stringify(expandedInvoice));

  const paymentIntent = await stripe.paymentIntents.retrieve(expandedInvoice.payment_intent.id, {
      expand: ['charges.data.balance_transaction'],
    }
  );
  
  const feeDetails = paymentIntent.charges.data[0].balance_transaction.fee_details;
  console.log('stripe fee amount: ' + (feeDetails[0].amount/100));

  // const stripeInvoiceItems = await stripe.invoiceItems.list({
  //   invoice: invoice.id
  // });

  // for (const stripeInvoiceItem of stripeInvoiceItems.data) {
  //   if (stripeInvoiceItem.metadata) {
  //     console.log(stripeInvoiceItem.metadata);
  //   }
  // }
 
})();