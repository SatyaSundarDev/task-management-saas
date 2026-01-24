import express from "express"
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import { protect } from "./middleware/authMiddleware.js"
import workspaceRoutes from "./routes/workspaceRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/workspaces", workspaceRoutes)

app.use("/api/v1", taskRoutes)

app.get("/health", (req, res) => {
    res.json({status: "OK"})
})

app.use("/api/v1/workspaces", projectRoutes)

app.get("/api/v1/protected", protect, (req, res) => {
    res.json({
        message: "You are authorized",
        user: req.user
    })
})

export default app