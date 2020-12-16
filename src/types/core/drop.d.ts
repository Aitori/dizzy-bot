import { Document } from "mongoose";

export interface Drop extends Document {
  tier: number;
  weight: number;
  gacha: string;
}
