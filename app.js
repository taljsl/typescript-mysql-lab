"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var mysql = require("mysql2");
var Database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
Database.connect(function (err) {
    if (err) {
        console.error('Connection error', err);
    }
    else {
        console.log('Connected to database');
    }
});
var greetiing = "Hello World!";
console.log(greetiing);
