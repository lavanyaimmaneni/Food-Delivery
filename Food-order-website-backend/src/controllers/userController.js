const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://lavanyaimmaneni12:abc def ghi@cluster0.bxbadpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri);

client.connect()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Signup function
const signup = async (req, res) => {
    console.log("inside signup")
    const { mobile, name, email } = req.body;
    const existingUser = await client.db("users").collection("food-users").findOne({ $or: [{ mobile }, { email }] });
    
    if (existingUser) {
        return res.status(400).json({ message: 'User already registered!' });
    }
    console.log("user in signup", existingUser)
    const newUser = { mobile, name, email };
    await client.db("users").collection("food-users").insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully!' });
};

// Login function
const login = async (req, res) => {
    const { mobile } = req.body;
    console.log("login page....")
    const user = await client.db("users").collection("food-users").findOne({ mobile });
    console.log("user in login", user);
    
    if (!user) {
        return res.status(404).json({ message: 'User not registered!' });
    }
    
    res.status(200).json(user);
};


module.exports = { signup, login };
