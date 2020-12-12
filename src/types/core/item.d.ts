import { Document } from 'mongoose';

export interface Item extends Document {
  item_id: number;
  name: string;
  description: string;
  imageUrl: string;
  cost: number;
}
