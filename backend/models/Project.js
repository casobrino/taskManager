import mongoose from "mongoose";

const porjectSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    deadline: {
        type: Date,
        default: Date.now(),
    },
    client: {
        type: String,
        trim: true,
        required: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    colaborators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
},
    {
        timestamps: true
    }
);

const Project = mongoose.model('Project', porjectSchema);
export default Project; 