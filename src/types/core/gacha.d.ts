import { Document } from "mongoose";

export interface Gacha extends Document {
  cost: number;
  gacha: string;
}
