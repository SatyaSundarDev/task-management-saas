import express from "express"
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import { protect } from "./middleware/authMiddleware.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/auth", authRoutes)

app.get("/health", (req, res) => {
    res.json({status: "OK"})
})

app.get("/api/v1/protected", protect, (req, res) => {
    res.json({
        message: "You are authorized",
        user: req.user
    })
})

export default app