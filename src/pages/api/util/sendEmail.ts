import sgMail from '@sendgrid/mail';

export const sendEmail = async ({ to, name, company, email, phone, details, type }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let msg;

  if (type === 'NEW_CLIENT_CONTACT_FREELANCER') {
    msg = {
      to,
      from: 'matt@continuum.works',
      replyTo: email || 'matt@continuum.works',
      subject: `New client contact from ${name}`,
      text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nDetails: ${details}`,
      html: `Name: ${name}<br>Company: ${company}<br>Email: ${email}<br>Phone: ${phone}<br>Details: ${details}`,
    };
  } else if (type === 'NEW_CLIENT_CONTACT_CLIENT') {
    msg = {
      to,
      from: 'matt@continuum.works',
      replyTo: email || 'matt@continuum.works',
      subject: 'Your new project space on Continuum.',
      text: `Hi ${name}\n\nHere's a link to your project space: ${details}`,
      html: `Hi ${name},<br><br>Here's a link to your project space: ${details}`,
    };
  }

  return sgMail.send(msg);
};
