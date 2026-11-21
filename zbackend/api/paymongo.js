
const axios = require('axios');
require('dotenv').config();

// Gumagawa ng PayMongo Checkout Session
const createCheckoutSession = async (amount, orderId) => {

    const response = await axios.post(
        'https://api.paymongo.com/v2/checkout_sessions',
        {
            data: {
                attributes: {
                    line_items: [
                        {
                            name: `Kumo Ramen Order #${orderId}`,
                            amount: amount,
                            currency: 'PHP',
                            quantity: 1
                        }
                    ],
                    payment_method_types: ['gcash'],
                    reference_number: `ORDER-${orderId}`,
                    success_url: `${process.env.FRONTEND_URL}/payment-success`,
                    cancel_url: `${process.env.FRONTEND_URL}/cart`,
                    metadata: {
                        order_id: String(orderId)
                    }
                }
            }
        },
        {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.PAYMONGO_SECRET_KEY}:`
                ).toString('base64')}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.data;
};

module.exports = createCheckoutSession;

