"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_model = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var user_model = mongoose_1.default.model('User', new mongoose_1.default.Schema({
    id: { type: String },
    points: { type: Number, default: 0 },
    currency: { type: Number, default: 0 },
    registeredAt: { type: Number, default: Date.now() }
}));
exports.user_model = user_model;
