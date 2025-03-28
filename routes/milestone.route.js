import express from 'express';
import {createMilestone} from "../controllers/milestone.controller.js";

const milestoneRouter = express.Router();

milestoneRouter.post('/:id/milestones', createMilestone);

milestoneRouter.get('/:id/milestones', async (req, res) => {
    res.send('Get goal milestones');
})

milestoneRouter.get('/milestones/:id', async (req, res) => {
    res.send('Get goal milestone');
})

milestoneRouter.put('/milestones/:id', async (req, res) => {
    res.send('Update goal milestone');
})

milestoneRouter.delete('/milestones/:id', async (req, res) => {
    res.send('Delete goal milestone');
})

export default milestoneRouter;