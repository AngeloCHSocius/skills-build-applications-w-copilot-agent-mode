import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().lean();
  res.json({ teams });
});

router.post('/', async (req, res) => {
  const { name, members } = req.body;
  const team = await Team.create({ name, members: members ?? [] });
  res.status(201).json({ message: 'Team created', team });
});

export default router;
