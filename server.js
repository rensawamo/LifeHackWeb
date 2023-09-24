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
      user: process.env.My_EMAIL,
      pass: process.env.My_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.My_EMAIL,
    to: process.env.My_EMAIL,
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

app.listen(5500, () => {
  console.log("Server started on http://localhost:5500");
});
