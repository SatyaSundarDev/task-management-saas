import Workspace from "../models/Workspace.js"

export const requireWorkspaceMember = async (req, res, next) => {
    try{
    const {workspaceId} = req.params;
    const userId = req.user._id;

    const workspace = await Workspace.findById(workspaceId)
    if(!workspace){
        return res.status(404).json({message: "Workspace not found"})
    }

    const member = workspace.members.find(
        (m) => m.userId.toString() === userId.toString()
    )

    if(!member){
        return res.status(403).json({message: "Access Denied"})
    }

    req.workspace = workspace
    req.workspaceRole = member.role

    next()
}catch(error){
    res.status(500).json({message: "Workspace access chacke failed"})
}
}