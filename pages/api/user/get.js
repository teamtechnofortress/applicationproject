import jwt from 'jsonwebtoken';
import User from '@/models/User';
import { connectDb } from '@/helper/db';
import { parse } from 'cookie';

const handler = async (req, res) => {
  await connectDb();

  const { token } = parse(req.headers.cookie || '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
