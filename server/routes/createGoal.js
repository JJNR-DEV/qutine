const router = require('express').Router();
const Goal = require('../model/Goal');

router.post('/', async (req, res) => {
    console.log(req.body);
    const goal = new Goal({
        name: req.body.name,
        category: req.body.category,
        startTime: req.body.sTime,
        duration: req.body.duration,
        days: req.body.days
    })

    console.log(goal);

    try {
        const savedGoal = await goal.save();
        res.status(201).send(`You goal "${req.body.name}" has been successfully added!`)
    } catch({ message }) {
        res.status(500).send(`Something went wrong: ${message}`)
    }
})

module.exports = router;