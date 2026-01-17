import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { requireWorkspaceMember } from './../middleware/workspaceMiddleware.js';
import { addProjectMember, CreateProject, getProjects } from "../controllers/projectController.js";
import { requireProjectMember } from "../middleware/projectMiddleware.js";


const router = express.Router()

router.post(
    "/:workspaceId/projects",
    protect,
    requireWorkspaceMember,
    CreateProject
)

router.post(
    "/projects/:projectId/members",
    protect,
    requireProjectMember,
    addProjectMember
)

router.get(
    "./workspaceId/projects",
    protect,
    requireWorkspaceMember,
    getProjects
)

export default router