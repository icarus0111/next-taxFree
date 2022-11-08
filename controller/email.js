require('dotenv').config();
const nodemailer = require('nodemailer')
const accountController = require('./account')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

// exports.sendMail = async (req,res) => {
//   try{
//     const info = await transporter.sendMail({
//       from: 'TaxFree RV" taxfreervs@gmail.com',
//       to: "crobertjordan@yahoo.com",
//       subject: "User sent a message via contact page",
//       text: "Hello world?",
//       html: "<b>Hello world?</b>"
//     });
//     res.json({statusMessage:"Success"})
//   }
//   catch(error){
//     res.status(400).json({statusMessage:"All's not well"})
//   }
// }


exports.sendResetLink = async (email,token,res) =>{
  try{
    const info = await transporter.sendMail({
      from: 'TaxFree RV" taxfreervs@gmail.com',
      to: email,
      subject: "Reset Tax Free Password",
      html: `
      <div style="font-weight:100; font-family:sans-serif">Disregard if you did not reset your password from TaxFree RV</div>
      <br/>
      <div style="font-weight:100; font-family:sans-serif">This will only be available for the next 30 mins</div>
      <br/>
      <a href='http://taxfreervs.herokuapp.com/reset-password?token=${token}'>Reset Password here</a>
      `
    });
    res.json({statusMessage:"Success"})

  }catch(error){

  }
}

exports.sendCustomerQuery = async(req,res) => {
  try{
    const {email,phone,message} = req.body
    if((!email&&!phone)||!message){
      res.json({message:"Missing required fields"})
      return
    }

    const info = await transporter.sendMail({
      from: 'TaxFree RV" taxfreervs@gmail.com',
      to:'sales@taxfreerv.com',
      cc:['jjordan@taxfreerv.com','mdrummond@expensereduction.com'],
      subject: "TaxFree RV Customer Query",
      html: `
      <div style="font-weight:100;font-size:13px; font-family:sans-serif">
        <b>Customer Email Address:</b> ${email}
      </div>
      <br/>
      <div style="font-weight:100;font-size:13px; font-family:sans-serif">
        <b>Customer Phone #:</b> ${phone}
      </div>
      <br/>
      <div style="font-weight:100;font-size:13px; font-family:sans-serif">
        <b>Customer Message #:</b>
      </div>
      <br/>
      <pre style="font-weight:100; font-size:13px; font-family:sans-serif">
        ${message}
      </pre>
      <br/>
      `
    });

    res.json({message:"Success"})


  }catch(err){
    console.log("ERROR",err)
    res.json({message:"Error sending customer query"})
  }


}

exports.sendPngContract = async(req,res) => {
  try{


    const {formDetails,email} = req.body
    accountController.updateAfterRegistration(email,formDetails)
    let subject =formDetails.payment.willPayOnline==='online'? 'TaxFree RV Account Creation -- Not confirmation of payment':'TaxFree RV Lead Creation'
    const info = await transporter.sendMail({
      from: 'TaxFree RV" taxfreervs@gmail.com',
      to:'sales@taxfreerv.com',
      cc:['jjordan@taxfreerv.com','mdrummond@expensereduction.com'],
      subject,
      attachments:[{
        filename: 'contract.pdf',
        path:req.body.data
      }],
      html: `
      <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Customer Name:</b>
        ${formDetails.firstName} ${formDetails.lastName}
        <br/>
      </div>
      <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Customer Email:</b>
        ${email}
        <br/>
      </div>
      <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Customer Phone:</b>
        ${formDetails.phone}
        <br/>
      </div>
      ${formDetails.phone2?`
        <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Additional Number:</b>
        ${formDetails.phone2}
        <br/>
    </div>` :''}
      ${formDetails.additionalFirstName?`
        <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Additional Customer Name:</b>
        ${formDetails.additionalFirstName} ${formDetails.additionalLastName}
        <br/>
    </div>` :''}

    <div style="font-weight:300;font-size:18px; font-family:sans-serif">
    <b>Customer Address:</b>
    ${formDetails.address}, ${formDetails.city}, ${formDetails.state}, ${formDetails.zipcode}
    <br/>
    </div>
    <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Source:</b>
        ${formDetails.source?formDetails.source:'Not Provided'}
        <br/>
    </div>

    <div style="font-weight:300;font-size:18px; font-family:sans-serif">
    <b>Customer Lender Details:</b>
    ${formDetails.finance.isFinanced?`
              ${formDetails.finance.lender} as a ${formDetails.finance.loanType} loan
            ` :'No Lender'}
            <br/>
          </div>

    <div style="font-weight:300;font-size:18px; font-family:sans-serif">
    <b>Customer Payment Intentions:</b>
    ${formDetails.payment.willPayOnline==='online'? 'To be made online':'To be contacted for payment information'}
            <br/>
          </div>
      `
    });
        res.sendStatus(200)
  }catch(err){
    console.log(err)
    res.sendStatus(400)
  }
}

exports.paymentMade = (email,billing_details) => {
  try{
   transporter.sendMail({
    from: 'TaxFree RV" taxfreervs@gmail.com',
    to:'sales@taxfreerv.com',
    cc:['jjordan@taxfreerv.com','mdrummond@expensereduction.com'],
    subject:'Payment made to TaxFree RV',
    html: `
    <div style="font-weight:300;font-size:18px; font-family:sans-serif">
    ${billing_details.receipt_url}
      <br/>
    </div>

    `
  })
   transporter.sendMail({
    from: 'TaxFree RV" taxfreervs@gmail.com',
    to:' sales@taxfreerv.com',
    cc:['jjordan@taxfreerv.com','mdrummond@expensereduction.com'],
    subject:'Customer online payment success',
    html: `
    <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Customer Email:</b>
         ${email}
        <br/>
    </div>
    <div style="font-weight:300;font-size:18px; font-family:sans-serif">
        <b>Online Payment Receipt URL:</b>
         ${billing_details.receipt_url}
        <br/>
    </div>
    `
  })
} catch(err){
  console.log(err)
}
}
