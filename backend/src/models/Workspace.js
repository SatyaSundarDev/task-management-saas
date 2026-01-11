import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        members: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    index: true
                },
                role: {
                    type: String,
                    enum: ["ADMIN", "MEMBER"],
                    default: "MEMBER"
                }
            }
        ]
    },

    {
        timestamps: true
    }
)

WorkspaceSchema.index({"members.userId": 1})

export default mongoose.model("Workspace", WorkspaceSchema)