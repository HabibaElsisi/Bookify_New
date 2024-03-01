import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import { emailTemplate } from "./emailTemplate.js";

export const sendEmail=async(email)=>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL_NAME,
          pass: process.env.EMAIL_PASS,
        },
      });
let token=jwt.sign({email},"mynameishabiba")

      const info = await transporter.sendMail({
        from: '"Route Node.js" <habibamsisi@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        html:emailTemplate(token)
      });
    
      console.log("Message sent: %s", info.messageId);
}