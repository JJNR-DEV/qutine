const router = require('express').Router();
const Routine = require('../model/Routine');

router.post('/new-routine', async (req, res) => {
    const routine = new Routine({
        name: req.body.name,
        category: req.body.category,
        startTime: req.body.sTime,
        duration: req.body.duration,
        days: req.body.days
    })

    try {
        await routine.save();
        res.status(201).send(`You routine task "${req.body.name}" has been successfully added!`)
    } catch({ message }) {
        res.status(500).send(`Something went wrong: ${message}`)
    }
})

// GET all routines

router.get('/all-routines', async (req, res) => {
    const allRoutines = await Routine.find({});
    res.json(allRoutines);
})

// DELETE one routine

router.delete('/delete-routine', (req, res) => {
    Routine.findOneAndDelete({ name: req.query.name }, () => {
        res.status(204).send({ message: 'Successfuly deleted task!' })
    })
})

module.exports = router;