import mongoose from 'mongoose';

const user_model: mongoose.Model<mongoose.Document> = mongoose.model(
  'User',
  new mongoose.Schema({
    id: { type: String },
    currency: { type: Number, default: 0 },
    registeredAt: { type: Number, default: Date.now() }
  })
);

export { user_model };
