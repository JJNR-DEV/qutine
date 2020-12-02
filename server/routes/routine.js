const router = require('express').Router();
const Routine = require('../model/Routine');
const RoutineNotification = require('../model/RoutineNotification');
const { verifyToken } = require("./verifyToken");

/**
 * Updates or Creates new routine
 */
router.post('/routine', verifyToken, async (req, res) => {
  const routine = {
    name: req.body.name,
    category: req.body.category,
    startTime: req.body.sTime,
    duration: req.body.duration,
    days: req.body.days,
    userEmail: req.body.userEmail,
    activateNotification: req.body.activateNotification,
  };

  const query = { _id: req.body.id };

  try {
    await Routine.findOneAndUpdate(query, routine, { upsert: true });
    res.status(201).send(`You routine task "${req.body.name}" has been successfully added!`);
  } catch ({ message }) {
    res.status(500).send(`Something went wrong: ${message}`);
  }
});

router.post('/notification', verifyToken, async (req, res) => {
  const { _id, name, userEmail } = req.body;
  const newRoutineNotification = new RoutineNotification({
    routineId: _id,
    routineName: name,
    created: new Date(),
    userEmail: userEmail,
  });

  try {
    await newRoutineNotification.save();
    res.status(201).send(`You routine task "${req.body.name}" has been successfully added!`);
  } catch ({ message }) {
    res.status(500).send(`Something went wrong: ${message}`);
  }
});

// GET all routines

router.get('/all-routines', verifyToken, async (req, res) => {
  const { email } = req.user;
  const allRoutines = await Routine.find({ userEmail: email });
  res.json(allRoutines);
});

// GET all day routines

router.get('/all-day-routines', verifyToken, async (req, res) => {
  const { today, userEmail } = req.query;
  const allDayRoutines = await Routine.find({ days: today, userEmail });
  res.json(allDayRoutines);
});

// GET specific routine

router.get('/get-selected-routine', verifyToken, async (req, res) => {
  const { routine } = req.query;
  const { email } = req.user;
  const selectedRoutine = await Routine.find({ name: routine, userEmail: email });
  res.json(selectedRoutine);
});

// PUT a routine

router.put('/update-routine', verifyToken, async (req, res) => {
  const { name, days } = req.body;
  await Routine.findOneAndUpdate({ name }, { days });
  res.status(204).send({ message: 'Successfuly deleted task for selected day!' });
});

// DELETE one routine

router.delete('/delete-routine', verifyToken, (req, res) => {
  const { name } = req.query;
  const { email } = req.user;
  Routine.findOneAndDelete({ name, userEmail: email }, () => res.status(204).send());
});

module.exports = router;
