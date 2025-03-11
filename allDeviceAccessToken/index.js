const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/MYTEST");
        console.log("Database connected");
    } catch (e) {
        console.log("err", e);
    }
})();


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
})

app.post("/login", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email: email, password: password });
        if (!user) {
            user = await User.create({
                name,
                email,
                password
            });
            // console.log(user);
        }

        const token = jwt.sign({ email: email }, 'secret');
        // console.log(user);
        // console.log("Token created:", token);

        res.cookie('token', token);

        user.tokens.push({ token });
        await user.save();
        res.sendFile(path.join(__dirname, '/public/logout.html'))
    } catch (e) {
        console.log("Error:", e.message);
    }
})

const auth = async (req, res, next) => {
    const token = req.cookies?.token;
    if(token){
        var decoded = jwt.verify(token, 'secret');
        const user = await User.findOne({ email: decoded.email })
        req.user = user
        next();
    } else{
        console.log("Error Middleware");
    }
}

app.get("/see", auth, (req, res) => {
    res.send(req.user);
})

app.get("/logout", auth, async (req,res)=>{
    const token = req.cookies?.token;
    req.user.tokens = req.user.tokens.filter(t => t.token !== token);
    await req.user.save();

    res.clearCookie('token');
    // res.cookie('token', "");
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");

})