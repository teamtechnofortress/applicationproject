// pages/api/logout.js
import { serialize } from 'cookie';

const Logout = (req, res) => {
  if (req.method === 'POST') {
    // Set the token cookie with an expiration date in the past to remove it
    res.setHeader('Set-Cookie', serialize('token', '', {
      path: '/',
      expires: new Date(0), // Set expiration date to past
      httpOnly: true,
      sameSite: 'strict',
    }));

    return res.status(200).json({ message: 'Logout successful' });
  } else {
    // Return a 405 Method Not Allowed error for other HTTP methods
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

export default Logout;
