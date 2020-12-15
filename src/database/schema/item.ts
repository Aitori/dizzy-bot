import mongoose from 'mongoose';
import { Item } from '../../types';

const item_model: mongoose.Model<Item> = mongoose.model(
  'Item',
  new mongoose.Schema({
    item_id: { type: Number },
    name: { type: String },
    imageUrl: { type: String },
    cost: { type: Number }
  })
);

export { item_model };
