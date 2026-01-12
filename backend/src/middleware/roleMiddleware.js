export const requireAdmin = (req, res, next) => {
    if(req.workspaceRole !== "ADMIN"){
        return res.status(403).json({message: "Admin Access Required"})
    }

    next()
}