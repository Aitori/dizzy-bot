import { Document } from "mongoose";

export interface Inventory extends Document {
  uid: string;
  item_id: number
  count: number;
}