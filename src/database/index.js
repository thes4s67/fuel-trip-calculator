// import Database from "better-sqlite3";
// //TODO: review this
// const db = new Database("../app/src/database/database.db");

// export const selectData = async (query) => {
//   return await new Promise((resolve, reject) => {
//     try {
//       let output = [];
//       const sql = db.prepare(query);
//       for (let row of sql.iterate()) {
//         output.push(row);
//       }
//       resolve(output);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

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

export const selectQuery = (query) => {
  return new Promise((resolve, reject) => {
    client.query({ rowMdoe: "array", text: query }, (err, res) => {
      if (err) return reject(err);
      return resolve(res.rows);
    });
  });
};
