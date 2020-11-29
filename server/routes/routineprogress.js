const router = require('express').Router();
const RoutineProgress = require('../model/RoutineProgress')

router.post('/status', async (req, res) => {
    const {routineId, routineName, userEmail, status} = req.body;

    const existingRoutineProgress = await RoutineProgress.findOne({
        'routineId': routineId
    })

    try {
        if (existingRoutineProgress) {
            await RoutineProgress.findOneAndUpdate(
                {routineId: routineId},
                {$inc: status === 'COMPLETE' ? {'daysComplete': 1} : {'daysIncomplete': 1}});
        } else {
            const routineProgress = new RoutineProgress({
                routineId: routineId,
                routineName: routineName,
                userEmail: userEmail,
                daysComplete: status === 'COMPLETE' ? 1 : null,
                daysIncomplete: status === 'INCOMPLETE' ? 1 : null
            })
            await routineProgress.save();
        }
        res.status(201).send(`Registered routine progress ${req.body.routineName}`);
    } catch (error) {
        res.status(400).send(`Failed to save routine progress for ${req.body.routineName}`);
    }
})

module.exports = router;
