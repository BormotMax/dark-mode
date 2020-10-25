import sgMail from '@sendgrid/mail';

export const sendEmail = async ({ freelancerEmail, freelancerName, clientEmail, clientName, type, projectUrl }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let msg;

  if (type === 'NEW_CLIENT_CONTACT_FREELANCER') {
    msg = {
      to: freelancerEmail,
      from: { email: 'notifications@continuum.works', name: 'Continuum' },
      replyTo: clientEmail || 'notifications@continuum.works',
      subject: `New client contact from ${clientName}`,
      text: `Hey ${freelancerName.split(' ')[0]},\n\nYou have a new client conversation from ${clientName}.\n\n${projectUrl}\n\n`,
      html: `<div style="font-family:Helvetica;font-size:14px;">
      <div style="text-align:left;">
        <img
          style="margin-top:50px;"
          src="https://continuum-resources.s3.amazonaws.com/horizontalEmailLogo.png"
          alt="logo"
        />
      </div>
      <div style="padding-top:30px;">
        Hey ${freelancerName.split(' ')[0]},
        <br />
        <br />
        You have a new 
        <a style="text-decoration:underline;" href="${projectUrl}">
          client conversation from ${clientName}.
        </a>
      </div>
    </div>
      `,
    };
  } else if (type === 'NEW_CLIENT_CONTACT_CLIENT') {
    msg = {
      to: clientEmail,
      from: { email: 'notifications@continuum.works', name: 'Continuum' },
      replyTo: freelancerEmail || 'notifications@continuum.works',
      subject: 'Your new project space on Continuum.',
      text: `Hey ${clientName.split(' ')[0]}\n\n${
        freelancerName.split(' ')[0]
      } has invited you to your new project space on Continuum:\n\n${projectUrl}\n\n`,
      html: `<div style="font-family:Helvetica;font-size:14px;">
      <div style="text-align:left;">
        <img
          style="margin-top:50px;"
          src="https://continuum-resources.s3.amazonaws.com/horizontalEmailLogo.png"
          alt="logo"
        />
      </div>
      <div style="padding-top:30px;">
        Hey ${clientName.split(' ')[0]},
        <br />
        <br />
        ${freelancerName.split(' ')[0]} has invited you to your new  
        <a style="text-decoration:underline;" href="${projectUrl}">
          project space on Continuum.
        </a>
      </div>
    </div>
      `,
    };
  }

  return sgMail.send(msg);
};
