require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const accountController = require('./account')

exports.sessionForward = async (req , res) => {
    if(req.body.data.object.paid){
      let details = req.body.data.object
      let email = req.body.data.object.billing_details.email || req.body.data.object.billing_details.name
      accountController.paymentMade(email,details)
    }

    res.json({received: true});
}


exports.session = async (req, res) => {
  try{
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            name: "Tax Free Rv LLC creation",
            description: "Montana LLC for RV",
            images: ["https://res.cloudinary.com/deuohexlo/image/upload/v1583611831/jnj_1_parkem.jpg"],
            amount: 99000,
            currency: "usd",
            quantity: 1
          }
        ],
        success_url: "https://taxfreervs.herokuapp.com/account?view=status",
        cancel_url: "https://taxfreervs.herokuapp.com/account?view=registration",
        billing_address_collection:'required',
        customer_email:req.user.email,
        client_reference_id:req.user.email,
        });
      res.json({session, key:process.env.STRIPE_PUBLISHABLE_KEY})
  }
  catch(error){
    console.log('error: ',error)
    res.json(error)
  }
}
