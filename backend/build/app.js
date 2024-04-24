"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const coupon_codes_routes_1 = __importDefault(require("./api/coupon-codes/coupon-codes-routes"));
// import { restrictAccess } from './middleware/coupon-middleware';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/dist")));
app.use("/api/coupon-codes", 
// restrictAccess,
coupon_codes_routes_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../frontend/dist", "index.html"));
});
exports.default = app;
//# sourceMappingURL=app.js.map