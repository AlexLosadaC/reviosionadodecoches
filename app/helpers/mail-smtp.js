"use strict";

const nodemailer = require("nodemailer");
const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendMailRegister(name, email, code) {
  const linkActivation =
    "http://localhost:3000/api/v1/users/activation?code=${code}";
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: "Welcome to ReviewsCars App",
    text: "Hi ${name}, to confirm account click",
    html: "Hi ${name}, to confirm account click",
  };
  const date = await transporter.sendMail(mailData);
  return data;
}

async function sendMailCorrectValidation(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: "[ReviewsCars] Welcome",
    text: "Hi ${name}, account validated",
    html: "Hi ${name}, account validated",
  };
  const date = await transporter.sendMail(mailData);
  return data;
}
module.exports = {
  sendMailRegister,
  sendMailCorrectValidation,
};
