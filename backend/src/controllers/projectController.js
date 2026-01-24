import Project from "../models/Project.js";

export const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            name: req.body.name,
            workspaceId: req.workspace._id,
            members: [req.user._id]
        })

        res.status(201).json({
            id: project._id,
            name: project.name
        })
    } catch (error) {
        res.status(500).json({ message: "Failed to create project" })
    }

}

export const addProjectMember = async (req, res) => {
    try {
        const { userId } = req.body

        if (req.project.members.includes(userId)) {
            return res.status(400).json({ message: "User already in project" })
        }

        req.project.members.push(userId)
        await req.projct.save()

        res.json({ message: "user added to project" })
    } catch (error) {
        res.status(500).json({ message: "Failed to add project membeer" })
    }

}

export const getProjects = async (req, res) => {
    try {
        const projcts = await Project.find({
            workspaceId: req.workspace._id
        })

        res.json(projcts)
    } catch (error) {
        res.status(500).json({message: "Failed to fetch projects"})
    }

}