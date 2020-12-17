import mongoose from 'mongoose';
import { Gacha } from '../../types';

const gacha_model: mongoose.Model<Gacha> = mongoose.model(
  'Gacha',
  new mongoose.Schema({
    cost: { type: Number },
    gacha: { type: String }
  })
);

export { gacha_model };