const router = require('express').Router();
const Goal = require('../model/Goal');

router.post('/new-goal', async (req, res) => {
  const goal = new Goal({
    name: req.body.name,
    category: req.body.category,
    startTime: req.body.sTime,
    duration: req.body.duration,
    days: req.body.days
  })
  try {
    const savedGoal = await goal.save();
    res.status(201).send(`You goal "${req.body.name}" has been successfully added!`)
  } catch({ message }) {
    res.status(500).send(`Something went wrong: ${message}`)
  }
})

router.get('/all-goals', async (req, res) => {
  const allGoals = await Goal.find({});
  console.log(allGoals);
  res.json(allGoals);
})

router.delete('/delete-goal', (req, res) => {
  Goal.findOneAndDelete({ name: req.query.name }, () => {
    res.status(204).send({ message: 'Successfuly deleted task!' })
  })
})

module.exports = router;