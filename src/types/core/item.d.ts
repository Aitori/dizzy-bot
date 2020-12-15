import { Document } from 'mongoose';

export interface Item {
  item_id: number;
  name: string;
  imageUrl: string;
  cost: number;
}
