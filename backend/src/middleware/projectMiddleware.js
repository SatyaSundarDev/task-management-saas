import Project from "../models/Project.js";

export const requireProjectMember = async (req, res, next) => {
    try {
        const { projectId } = req.params
        const userId = req.user._id

        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(404).json({ message: "Project not foumd" })
        }

        const isMember = project.members.some(
            (memberId) => memberId.toString() === userId.toString()
        )

        if (!isMember) {
            return res.status(403).json({ message: "Access Denied" })
        }

        req.project = project
        next()
    } catch (error) {
        res.status(500).json({ message: "Project acess check failed" })
    }

}

