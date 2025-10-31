require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { expenseRouter } = require('./routes/expenseRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/expense-tracker', expenseRouter);

connectDB()
    .then(() => {
        console.log("Database connected succesfully !");
    })
    .catch(() => {
        console.log("Failed to connect DB !");
    })

module.exports = app;