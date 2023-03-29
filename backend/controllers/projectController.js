import mongoose from 'mongoose';
import Project from '../models/Project.js'
import Task from '../models/Tasks.js';

const getProjects = async (req, res) => {
    const projects = await Project.find().where('host').equals(req.user);
    res.json(projects)
}

const newProject = async (req, res) => {
    const project = new Project(req.body);
    project.host = req.user._id;
    try {
        const projectSaved = await project.save();
        res.json(
            projectSaved
        )
    } catch (error) {
        console.log(error.message);
    }
}

const getProject = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
        return res.status(404).json({ msg: 'Project not found' });
    }
    const project = await Project.findById(id);
    if (!project) {
        const error = new Error('Project dont exist');
        return res.status(404).json({ msg: error.message });
    }
    if (project.host.toString() !== req.user._id.toString()) {
        const error = new Error("Permision deny");
        return res.status(401).json({ msg: error.message });
    }


    res.json(
        project,
    );
    //res.json(project)

}

const editProject = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
        return res.status(404).json({ msg: 'Project not found' });
    }
    const project = await Project.findById(id);
    if (!project) {
        const error = new Error('Project dont exist');
        return res.status(404).json({ msg: error.message });
    }
    if (project.host.toString() !== req.user._id.toString()) {
        const error = new Error("Permision deny");
        return res.status(401).json({ msg: error.message });
    }
    // project.name = req.body.name || project.name;
    // project.description = req.body.description || project.description;
    // project.client = req.body.client || project.client;
    // project.deadline = req.body.deadline || project.deadline;

    try {
        const newProject = await Project.findByIdAndUpdate(
            id,
            req.body,
            { new: true });
        return res.json(newProject)
    } catch (error) {
        console.log(error.message);
    }
}
const deleteProject = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id);
    if (!valid) {
        return res.status(404).json({ msg: 'Project not found' });
    }
    const project = await Project.findById(id);
    if (!project) {
        const error = new Error('Project dont exist');
        return res.status(404).json({ msg: error.message });
    }
    if (project.host.toString() !== req.user._id.toString()) {
        const error = new Error("Permision deny");
        return res.status(401).json({ msg: error.message });
    }
    try {
        await Project.findByIdAndDelete(id);
        return res.json({ msg: 'Eliminado correctamente' })
    } catch (error) {
        console.log(error.message);
    }
}
const addColaborator = async (req, res) => {
}
const deleteColaborator = async (req, res) => {
}


export {
    getProjects,
    getProject,
    newProject,
    editProject,
    deleteColaborator,
    deleteProject,
    addColaborator,
}