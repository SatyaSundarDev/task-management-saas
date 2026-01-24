import Task from "../models/Task.js"


export const createTask = async (req, res) => {
    try {
        const task = await Task.create({
        projectId: req.project._id,
        title: req.body.title,
        description: req.body.description,
        priority: rq.body.priority,
        assigneedId: req.body.assigneedId,
        dueDate: req.body.dueDate,
        createdBy: req.user._id
    })

    res.status(201).json(task)
    } catch (error) {
        res.status(500).json({message: "Failed to create task"})
    }
    
}

export const getProjectTasks = async (req, res) => {
    try {
        const tasks= await Task.find({
        projectId: req.project._id
    }).lean()

    const grouped = {
        TODO: [],
        IN_PROGRESS: [],
        DONE: []
    }

    tasks.forEach((task) => {
        grouped[task.status].push(task)
    })

    res.json(grouped)
    } catch (error) {
       res.status(500).json({message: "Failed to fetch tasks"}) 
    }
}