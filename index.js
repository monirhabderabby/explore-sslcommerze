const express = require('express')
const SSLCommerzPayment = require('sslcommerz-lts')
const cors = require('cors');
const app = express()

require('dotenv').config()
const port = 3000
app.use(cors());
app.use(express.json());

app.get('/init', (req, res) => {
  const data = {
      total_amount: 1350,
      currency: 'BDT',
      tran_id: 'REF123', // use unique tran_id for each api call
      success_url: 'http://localhost:3030/success',
      fail_url: 'http://localhost:3030/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: 'Customer Name',
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASS, false)
  sslcz.init(data).then(apiResponse => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL
      res.redirect(GatewayPageURL)
      console.log('Redirecting to: ', GatewayPageURL)
  });
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



