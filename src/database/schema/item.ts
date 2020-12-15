import mongoose from 'mongoose';

const itemModel: mongoose.Model<mongoose.Document> = mongoose.model(
  'Item',
  new mongoose.Schema({
    item_id: { type: Number },
    name: { type: String },
    imageUrl: { type: String },
    cost: { type: Number }
  })
);

export { itemModel };
