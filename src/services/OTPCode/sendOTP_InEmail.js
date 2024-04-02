import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { emailOTPTemplate } from "./emailOTPTemplate.js";

export const sendOTPEmail=async(email,forgetCode)=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_PASS,
        },
      });
let token=jwt.sign({email},"mynameishabiba")

      const info = await transporter.sendMail({
        from: '"Bookify" <habibamsisi@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html:emailOTPTemplate(token,forgetCode)
      });
    
      console.log("Message sent: %s", info.messageId);
}