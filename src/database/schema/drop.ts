import mongoose from 'mongoose';
import { Drop } from '../../types';

const drop_model: mongoose.Model<Drop> = mongoose.model(
  'Drop',
  new mongoose.Schema({
    tier: { type: Number },
    weight: { type: Number, default: 1 },
    gacha: { type: String }
  })
);

export { drop_model };
