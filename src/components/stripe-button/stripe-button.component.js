import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100; //get price value by cent
    const publishableKey = "pk_test_51Hgn4yAetUajz0zCar8FqgoAdv5ln99oPorGYZq8lKGl5VKpJ82AcdynC1rvLWWNTLdWfBl0IAQzM6O1aO9y4etD00SajoDGTR" 

    const onToken = token => {
        console.log(token);
        alert("Payment SuccessFull")
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="Kabesa's Shop"
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};


export default StripeCheckoutButton