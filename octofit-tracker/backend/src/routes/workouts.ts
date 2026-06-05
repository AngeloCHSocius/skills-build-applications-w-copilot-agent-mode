import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const { title, exercises, duration } = req.body;
  const workout = await Workout.create({ title, exercises: exercises ?? [], duration });
  res.status(201).json({ message: 'Workout created', workout });
});

export default router;
