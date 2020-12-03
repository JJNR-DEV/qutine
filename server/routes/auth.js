const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        const token = jwt.sign({_id: user._id, email: req.body.email}, process.env.TOKEN_SECRET);

        const currentUser = {
            id: savedUser._id,
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            accessToken: token
        };

        res.header('auth-token', token)
            .send(currentUser);
    } catch (err) {
        console.error("Failed to register user", err);
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong.');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Email or password is wrong');

    const token = jwt.sign({_id: user._id, email: req.body.email}, process.env.TOKEN_SECRET);

    const currentUser = {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken: token
    };

    res.header('auth-token', token)
        .send(currentUser);
});

module.exports = router;
