const express = require("express");
const router = express.Router();

const { userSignup, userSignin } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", userSignup);

router.post("/signin", userSignin);

router.get("/", authMiddleware, (req, res) => {
    res.send("AuthMiddleware Activated!");
})

module.exports = router;