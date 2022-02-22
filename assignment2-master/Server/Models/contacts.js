"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ContactSchema = new Schema({
    name: String,
    number: String,
    address: String
}, {
    collection: "list"
});
const Model = mongoose_1.default.model("ContactList", ContactSchema);
exports.default = Model;
//# sourceMappingURL=contacts.js.map