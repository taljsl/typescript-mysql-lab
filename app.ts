import * as dotenv from "dotenv";
dotenv.config();
import * as mysql from "mysql2";
import inquirer from "inquirer";

const Database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

Database.connect((err) => {
    if (err) {
        console.error('Connection error', err);
    } else {
        console.log('Connected to database');
    }
});

const greetiing:string = "Hello World!";
console.log(greetiing);