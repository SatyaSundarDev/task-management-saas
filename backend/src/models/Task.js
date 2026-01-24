import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        projectId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
            index: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["TODO", "IN_PROGRESS", "DONE"],
            default: "TODO",
            index: true
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "MEDIUM"
        },

        assigneedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        },

        dueDate: {
            type: Date,
            index: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true}
)

TaskSchema.index({projectId: 1, stuatus: 1})

export default mongoose.model("Task", TaskSchema)

