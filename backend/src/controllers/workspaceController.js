import User from "../models/User.js";
import Workspace from "../models/Workspace.js";

export const createWorkspace = async (req, res) => {
    try {
        const workspace = await Workspace.create({
        name: req.body.name,
        ownerId: req.user._id,
        members: [{userId: req.user._id, role:"ADMIN"}]
    })

    res.status(201).json({
        id:workspace._id,
        name: workspace.name
    })
    } catch (error) {
        res.status(500).json({message: "Failed to create workspace"})
    }
    
}

export const inviteMember = async (req, res) => {
    try {
        const {email, role} = req.body

    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message: "User not Found"})
    }

    const exists = req.workspace.members.find(
        (m) => m.userId.toString() === user._id.toString()
    )

    if(exists){
        return res.status(400).json({message: "User already a member"})
    }

    req.workspace.members.push({
        userId: user._id,
        role: role || "MEMBER"
    })

    await req.workspace.save()

    res.json({message: "Member Added"})
    } catch (error) {
        res.status(500).json({message: "Failed to add memeber"})
    }
    
}