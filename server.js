const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/send_mail", async (req, res) => {
  const { message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.YOUR_EMAIL, // ここを修正
      pass: process.env.YOUR_PASSWORD, // ここを修正
    },
  });

  let mailOptions = {
    from: process.env.YOUR_EMAIL, // ここを修正
    to: process.env.YOUR_EMAIL, // ここを修正
    subject: "New message from contact form",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Mail sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending mail");
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
