// lib/email/sendInvitationEmail.ts
import nodemailer from 'nodemailer';

export async function sendInvitationEmail(email: string, link: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'orjidominion32@gmail.com',
      pass: 'aurfjudndocfnqni',
    },
  });

  const mailOptions = {
    from: "Idea is Capital",
    to: email,
    subject: 'You’ve been invited!',
    html: `
      <h3>Hello!</h3>
      <p>You’ve been invited as an admin. Click the link below to set your password and activate your account:</p>
      <a href="${link}">Set Password</a>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
}
