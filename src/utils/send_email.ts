import nodemailer from "nodemailer";
import configs from "../configs";

/**
 * Sends email
 */
export default async function sendEmail(
  to: string,
  subject: string,
  msg: string
) {
  try{

  // Create the transporter
  const transport = nodemailer.createTransport({
    host: configs.smtp.host,
    port: Number(configs.smtp.port),
    auth: {
      user: configs.smtp.email,
      pass: configs.smtp.pswd,
    },
    secure: false,
    requireTLS: true,
    logger: true,
    debug: true,
  });

  // Create the message content
  const message = {
    from: `${configs.smtp.sender_name} <${configs.smtp.sender_email}>`,
    to,
    subject,
    text: msg,
  };

  // Send the email
  await transport.sendMail(message);
}catch(err){
  console.log(err);
  throw err;
}
}