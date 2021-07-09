const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
(async () => {
  console.log('Testing customer.preferred_locales property and its impact on invoices!');

  const customer = await stripe.customers.create({
    description: 'TEST PREFERRED LOCALE',
    email: 'claude.rossi@sap.com',
    preferred_locales: [ 'es-ES' ]
  });
  console.log("New Customer ID: " + customer.id);
  console.log("New Customer Preferred Locale: " + customer.preferred_locales[0]);
  
  const itemCreateParams = {
    customer: customer.id,
    currency: "eur",
    description: "Item to test preferred locale",
    amount: 1500 // In cents
  };
  const invoiceItem = await stripe.invoiceItems.create(itemCreateParams);

  const invoice = await stripe.invoices.create({
    customer: customer.id,
    auto_advance: false
  });

  console.log("Invoice has been generated: " + invoice.id);

  const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
  console.log("-------------------------------------------------------------------");
  console.log("URL to the PDF document: " + finalizedInvoice.invoice_pdf);
  console.log("Click the link to check the language of the PDF document! ");
  console.log("The invoice header should be in spanish");
  console.log("-------------------------------------------------------------------");

})();