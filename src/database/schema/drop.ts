import mongoose from 'mongoose';

const dropModel: mongoose.Model<mongoose.Document> = mongoose.model(
  'Drop',
  new mongoose.Schema({
    item_id: { type: Number, ref: 'Item' },
    weight: { type: Number, default: 1 }
  })
);

export { dropModel };
