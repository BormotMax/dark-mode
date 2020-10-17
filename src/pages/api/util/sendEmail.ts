import sgMail from '@sendgrid/mail';

export const sendEmail = async ({ to, name, company, email, phone, details, type, projectUrl }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let msg;

  if (type === 'NEW_CLIENT_CONTACT_FREELANCER') {
    msg = {
      to,
      from: { email: 'notifications@continuum.works', name: 'Continuum' },
      replyTo: email || 'notifications@continuum.works',
      subject: `New client contact from ${name}`,
      text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nDetails: ${details}\nProject Space: ${projectUrl}\n\n`,
      html: `Name: ${name}<br>Company: ${company}<br>Email: ${email}<br>Phone: ${phone}<br>Details: ${details}<br>Project Space: ${projectUrl}<br><br>`,
    };
  } else if (type === 'NEW_CLIENT_CONTACT_CLIENT') {
    msg = {
      to,
      from: { email: 'notifications@continuum.works', name: 'Continuum' },
      replyTo: 'notifications@continuum.works',
      subject: 'Your new project space on Continuum.',
      text: `Hi ${name}\n\nHere's a link to your project space: ${details}\n\n`,
      html: `Hi ${name},<br><br>Here's a link to your project space: ${details}<br><br>`,
    };
  }

  return sgMail.send(msg);
};
