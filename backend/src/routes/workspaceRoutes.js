import  express  from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createWorkspace, inviteMember } from '../controllers/workspaceController.js';
import { requireWorkspaceMember } from '../middleware/workspaceMiddleware.js';
import { requireAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router()

router.post("/", protect, createWorkspace)

router.post(
    "/:workspaceId/invite",
    protect,
    requireWorkspaceMember,
    requireAdmin,
    inviteMember
)

export default router
