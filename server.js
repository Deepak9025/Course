const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/aledura", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));


const enrollSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
    createdAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});


const Enroll = mongoose.model("Enroll", enrollSchema);
const Contact = mongoose.model("Contact", contactSchema);




app.post("/api/enroll", async (req, res) => {
    const { name, email, course } = req.body;
    if (!name || !email || !course) return res.status(400).json({ message: "All fields are required." });

    try {
        const newEnroll = new Enroll({ name, email, course });
        await newEnroll.save();
        res.json({ message: "Enrollment Successful!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});


app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "All fields are required." });

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.json({ message: "Message Sent Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
