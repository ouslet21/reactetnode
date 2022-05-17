import express from 'express';
const router = express.Router();
import stripe from 'stripe';
const Stripe = stripe('sk_test_51Kz7O5K40l9E7sP55oTmdOGVcX73oVNRMgehspsfOajcai2xI1EMAa9o0Wut3OceKQ6ysPOksWpbdkaCAEHkROdf00zczMINrZ');
router.post('/', async (req, res) => { console.log(req.body)
 let status, error;
 const { token, amount } = req.body;
 try {
 await Stripe.charges.create({
 source: token.id,
 amount,
 currency: 'usd',
 });
 status = 'success';
 } catch (error) {
 console.log(error);
 status = 'Failure';
 }
 res.json({ error, status });
 });
 export default router;