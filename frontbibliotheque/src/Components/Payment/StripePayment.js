import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
function StripePayment() {
 const publishableKey = 'pk_test_51Kz7O5K40l9E7sP5Ouq9ZV2qnN8xqkmP2CxzQ5xExg0PqvwDi18DN7BQnJVuqk5qL3OvWVA5ZpgzYJjioVs7xkCG00Af1SaNiq';
 const [product, setProduct] = useState({
 name: 'Headphone',
 price: 5,
 });
 const priceForStripe = product.price * 100;
 const handleSuccess = () => {
 MySwal.fire({
 icon: 'success',
 title: 'Payment was successful',
 time: 4000,
 });
 };
 const handleFailure = () => {
 MySwal.fire({
 icon: 'error',
 title: 'Payment was not successful',
 time: 4000,
 });
 };
 const payNow = async token => {
    try {
    const response = await axios({
    url: 'http://localhost:5000/api/payment',
    method: 'post',
    data: {
    amount: product.price * 100,
    token,
    },
    });
    if (response.status === 200) {
    handleSuccess();
    }
    } catch (error) {
    handleFailure();
    console.log(error);
    }
    }; 
   
 return (
 <div className="container">
 <h2>Complete React & Stripe payment integration</h2>
 <p>
 <span>Product: </span>
 {product.name}
 </p>
 <p>
 <span>Price: </span>${product.price}
 </p>
 <StripeCheckout
 stripeKey={publishableKey}
 label="Pay Now"
 name="Pay With Credit Card"
 billingAddress
 shippingAddress
 amount={priceForStripe}
 description={`Your total is $${product.price}`}
 token={payNow}
 />
 </div>
 );
}
export default StripePayment; 