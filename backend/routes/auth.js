const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const apiKeyAuth = require('../middleware/apiKeyAuth');




router.post('/register', apiKeyAuth, async (req, res) => {

    const { firstName, lastName, email, password, role } = req.body;
    const userRole = role === 'admin' ? 'user' : (role || 'user');


    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all required fields (first name, last name, email, password)' });
    }

    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User with this email already exists" });
        }


        user = new User({
            firstName,
            lastName,
            email,
            password,
            role: userRole
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);


        await user.save();


        const payload = { user: { id: user.id, role: user.role } };



        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });


        res.status(201).json({ accessToken, refreshToken });

    } catch (err) {
        console.error(err.message);

        res.status(500).json({ msg: 'Server error during registration', error: err.message });
    }
});




router.post('/login', apiKeyAuth, async (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter email and password' });
    }

    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }


        const payload = { user: { id: user.id, role: user.role } };


        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });


        res.status(200).json({ accessToken, refreshToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error during login', error: err.message });
    }
});




router.post('/token', apiKeyAuth, async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ msg: 'No refresh token provided' });
    }

    try {

        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);


        const payload = { user: { id: decodedToken.user.id, role: decodedToken.user.role } };


        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });


        res.status(200).json({ accessToken });

    } catch (err) {
        console.error(err.message);

        res.status(403).json({ msg: "Invalid or expired refresh token" });
    }
})

module.exports = router;