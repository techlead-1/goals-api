import express from 'express';
import {createGoal, getGoal, getGoals, updateGoal} from "../controllers/goals.controller.js";

const goalRouter = express.Router();

goalRouter.post('/', createGoal);

goalRouter.get('/', getGoals);

goalRouter.get('/:id', getGoal);

goalRouter.put('/:id', updateGoal);

goalRouter.delete('/:id', (req, res) => {
    res.send('Delete goal');
})

export default goalRouter;