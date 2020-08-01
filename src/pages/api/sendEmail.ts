import { NextApiRequest, NextApiResponse } from 'next';

import { sendEmail } from './util/sendEmail';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { to, name, company, email, phone, details } = req.body;
    try {
      await sendEmail({ to, name, company, email, phone, details });
    } catch (err) {
      return res.status(500).json({
        error: {
          code: 'internal_server_error',
          message: 'Sorry, the email could not be sent.',
        },
      });
    }
    return res.status(200).end();
  }
  return res.status(404).json({
    error: {
      code: 'not_found',
      message: "The requested endpoint was not found or doesn't support this method.",
    },
  });
};
