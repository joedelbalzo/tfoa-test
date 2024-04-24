"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = {};
if (process.env.QUIET) {
    config.logging = false;
}
const conn = new sequelize_1.Sequelize(process.env.DATABASE_URL || "postgres://localhost/tfoa_db", config);
exports.default = conn;
//# sourceMappingURL=conn.js.map