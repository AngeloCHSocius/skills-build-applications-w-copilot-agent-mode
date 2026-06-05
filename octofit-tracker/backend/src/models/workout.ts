import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  exercises: [{ type: String }],
  duration: { type: Number, required: true },
  difficulty: { type: String, default: 'medium' }
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
