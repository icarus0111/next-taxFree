require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../model/user.js');
const emailController = require('./email')
const jwtKey = process.env.JWT_SECRET
const jwtExpirySeconds = 1800

exports.get = async (req,res) => {
try{
    if(!req.user.email)return res.json({message:"No User details"})
    let user = await User.findOne({email:req.email})
    if(user)user.password = undefined
    res.json({user})


  }
  catch(err){
    console.log(err)
    return res.json({message:"Unknown Server Error"})
  }
}

exports.logout = (req, res) => {
  try{
    req.logout();
    res.json({message:'Success'})
  }catch(err){
    console.log(err)
    res.json({message:'Unknown Error'})
  }
};

exports.details = (req,res) => {
  let user = req.user
  if(user)user.password = undefined
  res.json({user})
}

exports.signup = (req, res) => {
  let { password, email } = req.body;
  if (!password) return res.json({ message: 'Must include Password'});
  password = bcrypt.hashSync(password, 10);
  const user = new User({
    password: password,
    email: email
  });

  user.save((error, user) => {
    if (error) {
      res.json({ message: 'Email Already in Use' });
      return;
    } else {
      user.password = undefined;
      req.logIn(user, function(loginErr) {
        if (loginErr) return next(loginErr);
        return res.json({ message: 'Success', user: user });
      });
    }
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (error, user) => {
    if (error) {
      return res.json({ message: 'Something went Wrong' });
    }
    if (!user) {
      return res.json({ message: 'Bad Email or Password' });
    } else {
      if (!user.comparePassword(password)) {
        return res.json({ message: 'Bad Email or Password' });
      } else {
        user.password = undefined;
        req.logIn(user, function(loginErr) {
          if (loginErr) return next(loginErr);
          return res.json({ message: 'Success', user: user });
        });
      }
    }
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if(!email) return res.json({message:"Need to provide email"})

  try{
      User.findOne({ email: email }, (error, user) => {
        if(error||!user){
          console.log(error)
          return res.json({message:"Can't find provided email"})
        }
        const token = jwt.sign({ email }, jwtKey, {
          algorithm: 'HS256',
          expiresIn: jwtExpirySeconds
        })
        if(email&&token){
          emailController.sendResetLink(email,token,res)
          return
        }
        res.json({message:"No token created"})
      })

  }catch(error){
    console.log(error)
     res.json({message:"Unknown Server Error"})

  }

}

exports.resetPassword = (req, res) => {
  let {token,password} = req.body
  let decoded
  if(!token)    return res.json({message:'No Token Found.\n Please use the link provided to you in your email.'})
  if(!password) return res.json({message:'No Password Found'})
  try{
     decoded = jwt.verify(req.body.token, jwtKey);
  }catch(err){
    console.log("ERROR",err)
  return res.json({message:'Expired Token. \n Needs to be within 30 mins when the reset link was sent'})
  }
  if(!decoded.email)    return res.json({message:'No Email Found'})

  password = bcrypt.hashSync(password, 10);

  try{
    User.findOneAndUpdate({ email:decoded.email },{password}, (error, user) => {
      if(error){
        console.log(error)
        return res.json({message:'Unknown Error Updating Password'})
      }

      return res.json({message:'Success'})
   })
 }
   catch(error){
     console.log("ERROR",err)
     res.json({message:'Unknown Error Updating Password'})
   }
  }


exports.updateAfterRegistration = (email,formDetails) => {
  let toUpdate = {
    firstName:formDetails.firstName,
    lastName:formDetails.lastName,
    address:{address:formDetails.address,city:formDetails.city,state:formDetails.state,zipcode:formDetails.zipcode},
    isFinanced:formDetails.finance.isFinanced,
    onlinePay:formDetails.payment.willPayOnline==='online'
  }
  try{
    User.findOneAndUpdate({ email:email },{...toUpdate}, (error, user) => {
      if(error){
        console.log(error)
        return res.json({message:'Unknown Error Updating Password'})
      }

   })
 }
   catch(error){
     console.log("ERROR",err)
   }
}

exports.paymentMade = (email,billingDetails) => {
  try{
    console.log('billingDetails',billingDetails.billing_details)
    emailController.paymentMade(email,billingDetails)
    User.findOneAndUpdate({ email:email },{billingDetails:billingDetails.billing_details,chargeSucceeded:true}, (error, user) => {
      if(error){
        console.log(error)
        return res.json({message:'Unknown Error MAKING PAYMENT WEBHOOK'})
      }

   })
 }
   catch(error){
     console.log("ERROR",err)
   }
}
