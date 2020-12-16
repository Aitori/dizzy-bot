import mongoose from 'mongoose';
import { Inventory } from '../../types/core/inventory';

const inventory_model: mongoose.Model<Inventory> = mongoose.model(
  'Inventory',
  new mongoose.Schema({
    uid: { type: String, ref: 'User' },
    item_id: { type: Number },
    count: { type: Number, default: 0 }
  })
);

export { inventory_model };
