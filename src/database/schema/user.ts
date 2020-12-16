import mongoose from 'mongoose';
import { User } from '../../types';

const user_model: mongoose.Model<User> = mongoose.model(
  'User',
  new mongoose.Schema({
    uid: { type: String },
    points: { type: Number, default: 0 },
    registeredAt: { type: Number, default: Date.now() }
  })
);

export { user_model };
