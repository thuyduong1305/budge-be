import * as dotenv from "dotenv";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";
dotenv.config();
import mongoose from "mongoose";

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   });

// const connection = mysql.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,

//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,

//   });

const dbState = [
  { value: 0, label: "Disconnected" },
  { value: 1, label: "Connected" },
  { value: 2, label: "Connecting" },
  { value: 3, label: "Disconnecting" },
];

const connection = async () => {
  const options = {
    // user: process.env.DB_USER,
    // pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  };

  await mongoose.connect(process.env.DB_HOST, options);
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find((f) => f.value === state).label, "to database");
};

export default connection;
