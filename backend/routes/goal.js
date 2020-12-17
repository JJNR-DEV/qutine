const router = require('express').Router();
const Goal = require('../model/Goal');
const { verifyToken } = require("../middleware/verify-token");

router.post('/new-goal', verifyToken, async (req, res) => {
  const goal = new Goal({
    name: req.body.name,
    category: req.body.category,
    amountOfTimes: req.body.amountOfTimes,
    counterAmount: 0,
    userEmail: req.body.userEmail
  });

  try {
    await goal.save();
    res.status(201).send(`You goal "${req.body.name}" has been successfully added!`);
  } catch ({ message }) {
    res.status(500).send(`Something went wrong: ${message}`);
  }
});

router.get('/all-goals', verifyToken, async (req, res) => {
  const { userEmail } = req.query;
  const allGoals = await Goal.find({ userEmail });
  res.json(allGoals);
});

router.put('/increment-goal', verifyToken, async (req, res) => {
  const { name, email, newCounter } = req.body;
  const goal = await Goal.find({ name, userEmail: email });

  try {
    if (newCounter <= goal[0].amountOfTimes) {
      await Goal.findOneAndUpdate({ name }, { counterAmount: newCounter });
      return res.status(204).send({ message: 'Successfuly incremented counter for goal!' });
    }
  } catch ({ message }) {
    console.log('Error', message)
    res.status(500).send(`Something went wrong: ${message}`);
  }
});

router.delete('/delete-goal', verifyToken, (req, res) => {
  const { name, userEmail } = req.query;
  try {
    Goal.findOneAndDelete({ name, userEmail }, () => res.status(204).send());
  } catch ({ message }) {
    res.status(500).send(`Something went wrong: ${message}`);
  }
});

module.exports = router;
