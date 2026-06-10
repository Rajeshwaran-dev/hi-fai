require("dotenv").config({ path: "./src/.env" });
const Razorpay = require("razorpay");

console.log("ID:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID?.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET?.trim(),
});

razorpay.orders.create({ amount: 100, currency: "INR" })
  .then(order => console.log("Success:", order.id))
  .catch(err => console.error("Error:", JSON.stringify(err, null, 2)));
