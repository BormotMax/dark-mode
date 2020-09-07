import { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from './util/sendEmail';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await sendEmail({ ...req.body });
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
