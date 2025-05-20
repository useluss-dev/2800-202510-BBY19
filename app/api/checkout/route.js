import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const body = await req.json();

        //validate the req
        if (!body.cartItems || !Array.isArray(body.cartItems)) {
            return new Response(JSON.stringify({ error: 'Invalid cart data' }), {
                status: 400,
            });
        } 

        //mapping through the cart items and return an object representing strip line items 
        const line_items = body.cartItems.map((item) => ({
            price_data: {
                currency: 'cad',
                product_data: {
                    name: item.name,
                    images: [],
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        //create a checkout session with line items and pass required options like shipping, tax, and promo codes
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items,
            automatic_tax: {
                enabled: true,
            },
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 1299, currency: 'cad' },
                        display_name: 'Standard shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 3 },
                            maximum: { unit: 'business_day', value: 5 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 2599, currency: 'cad' },
                        display_name: 'Express shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 1 },
                            maximum: { unit: 'business_day', value: 2 },
                        },
                    },
                },
            ],
            invoice_creation: {
                enabled: true,
            },
            phone_number_collection: {
                enabled: true,
            },
            //the redirect url after payment is successful or canceled
            success_url: `${req.headers.get('origin')}/success`,
            cancel_url: `${req.headers.get('origin')}/cart`,
        });

        //return the session url -- will be used on front end to redirect user to stripe checkout
        return new Response(JSON.stringify({ url: session.url }), {
            status: 200,
        });
    } catch (err) {
        console.error('Stripe Checkout Error:', err);
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
        });
    }
}
