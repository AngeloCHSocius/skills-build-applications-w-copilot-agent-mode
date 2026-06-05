import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number }
}, { timestamps: true });

const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntry;
