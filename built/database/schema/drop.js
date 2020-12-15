"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drop_model = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var drop_model = mongoose_1.default.model('Drop', new mongoose_1.default.Schema({
    item_id: { type: Number, ref: 'Item' },
    weight: { type: Number, default: 1 },
    gacha: { type: String }
}));
exports.drop_model = drop_model;
