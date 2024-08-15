
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
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
  const { email, subject, name, message } = dto;
  console.log(email)
  console.log(subject)
  console.log(message)

  return await transporter.sendMail({
    from: "info@synergyitnepal.com",
    to: "info@synergyitnepal.com",
    html: `<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  
  <body style="background-color:rgb(255,255,255);margin-top:auto;margin-bottom:auto;margin-left:auto;margin-right:auto;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;padding-left:0.5rem;padding-right:0.5rem">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:465px;border-width:1px;border-style:solid;border-color:rgb(234,234,234);border-radius:0.25rem;margin-top:40px;margin-bottom:40px;margin-left:auto;margin-right:auto;padding:20px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
              <tbody>
                <tr>
                  <td><img alt="" height="37" src="https://synergyit-ten.vercel.app/_next/image?url=%2Fimages%2Fsynergy-Logo.png&w=256&q=75" style="display:block;outline:none;border:none;text-decoration:none;margin-top:0px;margin-bottom:0px;margin-left:auto;margin-right:auto" width="40" /></td>
                </tr>
              </tbody>
            </table>
            <div>
            <div>
            <h1 style="color:rgb(0,0,0);font-size:24px;font-weight:400;text-align:center;padding:0px;margin-top:30px;margin-bottom:30px;margin-left:0px;margin-right:0px">Hi i am <strong>${name}</strong>
          
            </div>
            
<div className="flex justify-start items-center">
<p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hi</p>
<div className="flex justify-center items-center">${subject}</div>
</div>
            
            </div>
            <div className="flex items-start justify-start">
           <p className="text-sm font-medium "> ${message}</p>
           <div>
           <p>Thank you for your time and consideration.
</p>
<div>
Best regards,
 ${name}
   <p>${email}</h1>
</div>
          
           </div>
</div>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center;margin-top:32px;margin-bottom:32px">
              
            </table>
            </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>`,
    text: "Hello world?",
    subject: subject,
  })

}