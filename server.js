require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://emailsenderbyanubhav.netlify.app/",
    methods: ["POST", "GET", "PUT"],
  })
);
app.use(express.json());

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, subject } = req.body;

  console.log(name, email, subject);

  let mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: `Dear ${name},

We are thrilled to welcome you to PharmDel, a bespoke pharmacy delivery platform designed to enhance and streamline your order fulfillment and delivery services.

About PharmDel
PharmDel is a cutting-edge application that seamlessly integrates with your Pharmacy Management System (PMR), offering a user-friendly interface to manage deliveries efficiently. Our platform is intuitively designed, simple to set up, and easy to navigate, ensuring a hassle-free experience. 

Key Features
PMR Integration: Seamlessly connects with your existing PMR system for efficient data management.
Route Optimization & ETA: Optimizes delivery routes and provides accurate estimated arrival times.
Driver App: Equips drivers with tools for scanning, real-time tracking, and electronic proof of delivery.
Offline Deliveries: Ensures delivery operations continue smoothly, even without internet connectivity.
Nursing Home Portal: Simplifies multiple deliveries to single addresses, ideal for care homes. 

Getting Started
We offer an easy setup with no contractual obligations. Our team will set up the software for you at no charge, and you can cancel your subscription anytime. You will not be tied into a contract. 

Experience the benefits of a streamlined delivery process, increased efficiency, and improved customer satisfaction with PharmDel.

For more information or assistance, please contact us at:

Phone: 073-071-902-03
Email: info@pharmdel.com
We look forward to supporting your pharmacy's success.

Best regards,

The PharmDel Team

${process.env.COMPANY_URL}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send({
        success: false,
        message: "Error sending email",
      });
    } else {
      res.send({
        success: true,
        message: "Email sent",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
