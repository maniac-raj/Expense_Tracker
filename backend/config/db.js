const mongoose = require('mongoose');

async function connectDB() {
    try {        
        const connect = await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        return resizeBy.status(400).send("Error: " + error);
    }
}

module.exports = { connectDB }