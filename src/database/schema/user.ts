import mongoose from 'mongoose';

const userModel: mongoose.Model<mongoose.Document> = mongoose.model(
  'User',
  new mongoose.Schema({
    id: { type: String },
    points: {type: Number, default: 0},
    currency: { type: Number, default: 0 },
    registeredAt: { type: Number, default: Date.now() }
  })
);

export { userModel };
