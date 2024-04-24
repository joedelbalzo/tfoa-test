import { Sequelize } from "sequelize";

interface Config {
  logging?: boolean;
}

const config: Config = {};

if (process.env.QUIET) {
  config.logging = false;
}

const conn = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/tfoa_db", config);

export default conn;
