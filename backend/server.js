const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 3.2 Health Check
app.get('/health', (req, res) => res.json({ status: "ok" }));

// 3.1 API lấy thông tin cá nhân từ Database
app.get('/about', (req, res) => {
    db.query('SELECT * FROM student_info LIMIT 1', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy tại port ${PORT}`));