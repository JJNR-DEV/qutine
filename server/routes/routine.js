const router = require('express').Router();
const Routine = require('../model/Routine');

router.post('/new-routine', async (req, res) => {
    const routine = new Routine({
        name: req.body.name,
        category: req.body.category,
        startTime: req.body.sTime,
        duration: req.body.duration,
        days: req.body.days,
        userEmail: req.body.userEmail
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
    const { userEmail } = req.query;
    const allRoutines = await Routine.find({ userEmail });
    res.json(allRoutines);
})

// GET all day routines

router.get('/all-day-routines', async (req, res) => {
    const { today, userEmail } = req.query;
    const allDayRoutines = await Routine.find({ days: today, userEmail });
    res.json(allDayRoutines);
})

// GET specific routine

router.get('/get-selected-routine', async (req, res) => {
    const { routine } = req.query;
    const selectedRoutine = await Routine.find({ name: routine });
    res.json(selectedRoutine);
})

// PUT a routine

router.put('/update-routine', async (req, res) => {
    const { name, days } = req.body;
    await Routine.findOneAndUpdate({ name }, { days });
    res.status(204).send({ message: 'Successfuly deleted task for selected day!' })
})

// DELETE one routine

router.delete('/delete-routine', (req, res) => {
    const { name, userEmail } = req.query;
    Routine.findOneAndDelete({ name, userEmail }, () => res.status(204).send());
})

module.exports = router;