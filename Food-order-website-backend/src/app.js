const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://devvijay7113:DevVijay1234@cluster0.zfriu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri);


client.connect()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

const cors = require("cors");
const bodyParser = require("body-parser");
// const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

module.exports = app;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
