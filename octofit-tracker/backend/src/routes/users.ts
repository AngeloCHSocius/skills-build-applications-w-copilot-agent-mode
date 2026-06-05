import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.status(201).json({ message: 'User created', user });
});

export default router;
