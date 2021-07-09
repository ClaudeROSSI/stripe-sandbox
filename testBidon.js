const stripe = require('stripe')('sk_test_51IM6soKHtGlSi68fCcZI2MH74SCXHP0FyaNgaWk8jiAiSYAUjEY20IIlsZ6c2tczPy6UIWJbakHUM1aEZyOZ5C2R00T78urjPF');

const customer = await stripe.customers.create({
  description: 'My First Test Customer (created for API docs)',
});