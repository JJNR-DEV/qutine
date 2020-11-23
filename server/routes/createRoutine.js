const router = require('express').Router();
const Routine = require('../model/Routine');

router.post('/', async (req, res) => {
    const routine = new Routine({
        name: req.body.name,
        category: req.body.category,
        startTime: req.body.sTime,
        duration: req.body.duration,
        days: req.body.days
    })

    try {
        const savedRoutine = await routine.save();
        res.status(201).send(`You routine task "${req.body.name}" has been successfully added!`)
    } catch({ message }) {
        res.status(500).send(`Something went wrong: ${message}`)
    }
})

module.exports = router;