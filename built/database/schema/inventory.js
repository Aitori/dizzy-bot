"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory_model = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var inventory_model = mongoose_1.default.model('Inventory', new mongoose_1.default.Schema({
    id: { type: String, ref: 'User' },
    item_id: { type: Number },
    count: { type: Number, default: 1 }
}));
exports.inventory_model = inventory_model;
