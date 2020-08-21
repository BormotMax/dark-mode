import sgMail from '@sendgrid/mail';

export const sendEmail = async ({ to, name, company, email, phone, details }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from: 'matt@continuum.works',
    replyTo: email,
    subject: `New client contact from ${name}`,
    text: 'hello',
    html: `Name: ${name}<br>Company: ${company}<br>Email: ${email}<br> Phone: ${phone}<br> Details: ${details}`,
  };
  return sgMail.send(msg);
};
