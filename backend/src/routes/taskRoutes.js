
import  express  from 'express';
import { protect } from './../middleware/authMiddleware.js';
import { requireProjectMember } from '../middleware/projectMiddleware.js';
import { createTask, getProjectTasks } from '../controllers/taskController.js';

const router = express.Router()

router.post(
    "./projects/:projectId/tasks",
    protect,
    requireProjectMember,
    createTask
)

router.get(
    "./projects/:projectId/tasks",
    protect,
    requireProjectMember,
    getProjectTasks
)

export default router