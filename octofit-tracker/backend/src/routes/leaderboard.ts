import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort({ score: -1 }).lean();
  res.json({ leaderboard });
});

router.post('/', async (req, res) => {
  const { userId, score } = req.body;
  const entry = await LeaderboardEntry.create({ userId, score });
  res.status(201).json({ message: 'Leaderboard entry created', entry });
});

export default router;
