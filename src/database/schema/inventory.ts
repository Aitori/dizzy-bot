import mongoose from 'mongoose';

const inventory_model: mongoose.Model<mongoose.Document> = mongoose.model(
  'Inventory',
  new mongoose.Schema({
    id: { type: String, ref: 'User' },
    item_id: { type: Number },
    count: { type: Number, default: 1 }
  })
);

export { inventory_model };
