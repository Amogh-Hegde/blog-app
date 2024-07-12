"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBody = exports.PostBody = exports.siginInBody = exports.signUpBody = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpBody = zod_1.default.object({
    name: zod_1.default.string().optional(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
exports.siginInBody = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
});
exports.PostBody = zod_1.default.object({
    title: zod_1.default.string(),
    body: zod_1.default.string(),
});
exports.editBody = zod_1.default.object({
    id: zod_1.default.string(),
    updatedTitle: zod_1.default.string().optional(),
    updatedBody: zod_1.default.string().optional(),
});
