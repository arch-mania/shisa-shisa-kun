import nodemailer from 'nodemailer';

type EmailData = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  from?: string;
};

export const sendEmail = async ({ to, subject, text, html, from }: EmailData) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.verify();

    const mailOptions: nodemailer.SendMailOptions = {
      from: from || process.env.GMAIL_USER,
      to,
      subject,
      text,
    };

    if (html) {
      mailOptions.html = html;
    }

    const result = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};
