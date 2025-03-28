import express from 'express';
import {createMilestone, getMilestone, getMilestones} from "../controllers/milestone.controller.js";

const milestoneRouter = express.Router();

milestoneRouter.post('/:id/milestones', createMilestone);

milestoneRouter.get('/:id/milestones', getMilestones);

milestoneRouter.get('/milestones/:id', getMilestone);

milestoneRouter.put('/milestones/:id', async (req, res) => {
    res.send('Update goal milestone');
})

milestoneRouter.delete('/milestones/:id', async (req, res) => {
    res.send('Delete goal milestone');
})

export default milestoneRouter;