const mysql = require("mysql2");
require('dotenv').config();


const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "admin",
    password : process.env.DB_PASSWORD || "admin123",
    database: process.env.DB_NAME || "todo_app" 
});

db.connect((err) => {
    if (err) {
        console.log("Kesalahan koneksi " + err);
        process.exit(1); 
    } else {
        console.log("Koneksi database berhasil!");
    }
});


module.exports = db;
