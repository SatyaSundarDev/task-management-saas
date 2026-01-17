import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        workspaceId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true
        },

        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Useer",
                index: true
            }
        ]
    },
    {timestamps: true}
)

export default mongoose.model("Project", ProjectSchema)