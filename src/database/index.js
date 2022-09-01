import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
client.connect();

export const selectQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    client.query(query, values, (err, res) => {
      if (err) return reject(err);
      return resolve(res.rows);
    });
  });
};
