
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: pass,
  },

} as SMTPTransport.Options)
type SendEmailDto = {
  email: Mail.Address,
  recipients: Mail.Address[],
  subject: string,
  name: string,
  message: string,
}

export const SendEmailDto = async (dto: SendEmailDto) => {
  const { email, recipients, subject, name, message } = dto;

  return await transporter.sendMail({
    from: email,
    to: recipients,
    html: `<p>From: ${name}</p><p>${message}</p>`,
    text: "Hello world?",
    subject: subject,
  })

}