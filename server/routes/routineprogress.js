const router = require('express').Router();
const RoutineProgress = require('../model/RoutineProgress')

router.post('/complete', async (req, res) => {
    const {routineId, routineName, userEmail} = req.body;

    const existingRoutineProgress = await RoutineProgress.findOne({
        'routineId': routineId
    })

    try {
        if (existingRoutineProgress) {
            await RoutineProgress.findOneAndUpdate(
                {routineId: routineId},
                {$inc: {'daysComplete': 1}});
            console.log('Updating existing routine progress', existingRoutineProgress.routineName);
        } else {
            const routineProgress = new RoutineProgress({
                routineId: routineId,
                routineName: routineName,
                userEmail: userEmail,
                daysComplete: 1
            })
            console.log('Saving new routine progress ', routineProgress);
            await routineProgress.save();
        }
        res.status(201).send(`Registered routine progress ${req.body.routineName}`);
    } catch (error) {
        res.status(400).send(`Failed to save routine progress for ${req.body.routineName}`);
    }
})

router.post('/incomplete', async (req, res) => {
    const {routineId, routineName, userEmail} = req.body;

    const existingRoutineProgress = await RoutineProgress.findOne({
        routineId: routineId
    })

    try {
        if (existingRoutineProgress) {
            await RoutineProgress.findOneAndUpdate(
                {routineId: routineId},
                {$inc: {'daysIncomplete': 1}});
        } else {
            const routineProgress = new RoutineProgress({
                routineId: routineId,
                routineName: routineName,
                userEmail: userEmail,
                daysIncomplete: 1
            })
            await routineProgress.save();
        }
        res.status(201).send(`Registered routine progress ${req.body.routineName}`);
    } catch (error) {
        res.status(400).send(`Failed to save routine progress for ${req.body.routineName}`);
    }
})


module.exports = router;
