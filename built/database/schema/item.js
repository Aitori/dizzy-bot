"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.item_model = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var item_model = mongoose_1.default.model('Item', new mongoose_1.default.Schema({
    item_id: { type: Number },
    name: { type: String },
    imageUrl: { type: String },
    cost: { type: Number }
}));
exports.item_model = item_model;
