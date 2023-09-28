const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const HttpError = require("../../helpers/HttpError");
const { UserModel } = require("../../models/UserModel");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const subscribeEmail = async (req, res) => {
  const { name } = req.user;
  const { email } = req.body;

  if (!email) {
    throw HttpError(400, "Email is required");
  }

  const existingSubscriber = await UserModel.findOne({
    subscriptionEmail: email,
  });

  if (existingSubscriber) {
    throw HttpError(409, "This email-address is already subscribed");
  }

  const msg = {
    to: email,
    from: "sergiimolchanovdublicate@gmail.com",
    subject: " 'Drink Master' Successful Subscription",
    html: `
    <div style="
        font-family: Manrope, sans-serif;
        padding: 20px;
        background-color: #0a0a11;
      ">
      <div style="
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: rgba(22, 31, 55, 0.5);
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        ">
        <h2 style="
            color: #f3f3f3;
            font-size: 40px;
            font-weight: 600;
            line-height: 1.1;
          ">Welcome, ${name}!</h2>
        <p style="
            font-size: 17px;
            line-height: 1.56;
            color: rgba(243, 243, 243, 0.5);
            padding: 20px;
          ">You have subscribed to the address: ${email}. Thank you for subscribing to our content! 
         Until the new meetings to "Drink Master"</p>
        <a href="https://dimasavchuk.github.io/Drink_master/drinks"
          style="
            border: 1px solid transparent;
            display: inline-block;
            padding: 10px 20px;
            color: rgba(22, 31, 55, 1);
            background-color: #f3f3f3;
            border-radius: 42px;
            text-decoration: none;
          ">Visit our website</a>
      </div>
    </div>`,
  };

  await sgMail.send(msg);

  const userID = req.user._id;

  await UserModel.findByIdAndUpdate(userID, { subscriptionEmail: email });

  res.json({
    status: "success",
    code: 200,
    message: "Subscription email sent successfully.",
    email,
  });
};

module.exports = subscribeEmail;
