import { Document } from "mongoose";

export interface Drop extends Document {
  item_id: number;
  weight: number;
  gacha: string;
}
