import express from 'express';
import {
    createMilestone,
    deleteMilestone,
    getMilestone,
    getMilestones,
    updateMilestones
} from "../controllers/milestone.controller.js";

const milestoneRouter = express.Router();

milestoneRouter.post('/:id/milestones', createMilestone);

milestoneRouter.get('/:id/milestones', getMilestones);

milestoneRouter.get('/milestones/:id', getMilestone);

milestoneRouter.put('/milestones/:id', updateMilestones)

milestoneRouter.delete('/milestones/:id', deleteMilestone);

export default milestoneRouter;