import express from 'express';
import {createGoal} from "../controllers/goals.controller.js";

const goalRouter = express.Router();

goalRouter.post('/', createGoal);

goalRouter.get('/', (req, res) => {
    res.send('Get goals');
})

goalRouter.get('/:id', (req, res) => {
    res.send('Get goal');
})

goalRouter.put('/:id', (req, res) => {
    res.send('Update goal');
})

goalRouter.delete('/:id', (req, res) => {
    res.send('Delete goal');
})

export default goalRouter;