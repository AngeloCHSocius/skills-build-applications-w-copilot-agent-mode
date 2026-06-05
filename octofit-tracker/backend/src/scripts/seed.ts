// Seed the octofit_db database with test data
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGODB_URI } from '../config.js';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Workout from '../models/workout.js';

dotenv.config();

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Ava Martinez', email: 'ava.martinez@example.com', role: 'member' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
    { name: 'Sophia Lee', email: 'sophia.lee@example.com', role: 'coach' }
  ]);

  const teams = await Team.create([
    {
      name: 'Sunrise Sprinters',
      description: 'A community for early-morning runners focusing on speed and stamina.',
      members: [users[0]._id, users[1]._id]
    },
    {
      name: 'Core Crushers',
      description: 'High-intensity group workouts with a focus on strength and core stability.',
      members: [users[1]._id, users[2]._id]
    }
  ]);

  const activities = await Activity.create([
    {
      userId: users[0]._id,
      type: 'Running',
      duration: 42,
      calories: 450,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      userId: users[1]._id,
      type: 'Cycling',
      duration: 60,
      calories: 620,
      date: new Date(Date.now() - 1000 * 60 * 60 * 8)
    },
    {
      userId: users[2]._id,
      type: 'Yoga',
      duration: 50,
      calories: 220,
      date: new Date()
    }
  ]);

  const leaderboard = await LeaderboardEntry.create([
    { userId: users[0]._id, score: 820, rank: 1 },
    { userId: users[1]._id, score: 760, rank: 2 },
    { userId: users[2]._id, score: 690, rank: 3 }
  ]);

  const workouts = await Workout.create([
    {
      title: 'Full Body Strength Blast',
      exercises: ['Push-ups', 'Deadlifts', 'Planks', 'Kettlebell swings'],
      duration: 55,
      difficulty: 'hard'
    },
    {
      title: 'Recovery Flow',
      exercises: ['Stretching', 'Deep breathing', 'Mobility drills'],
      duration: 35,
      difficulty: 'easy'
    }
  ]);

  console.log('Seed complete:', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
    workouts: workouts.length
  });
  console.log('Verify data with API responses from GET /api/users, /api/teams, /api/activities, /api/leaderboard, and /api/workouts.');

  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seed failure:', error);
    process.exit(1);
  });
