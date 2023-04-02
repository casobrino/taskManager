import Project from "../models/Project.js";
import Task from "../models/Tasks.js";
const addTask = async (req, res) => {
    const { project } = req.body;
    const existProject = await Project.findById(project)
    if (!existProject) {
        const error = new Error('Project dosnt found');
        return res.status(404).json({ msg: error.message });
    }

    if (existProject.host.toString() !== req.user._id.toString()) {
        const error = new Error('Permision deny for add taks');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const task = await Task.create(req.body);
        //Almacenar el id en el proyecto
        existProject.tasks.push(task._id)
        await existProject.save()
        res.json(task)
    } catch (error) {
        console.log(error);
    }

};
const getTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id).populate('project')
        if (task.project.host.toString() !== req.user._id.toString()) {
            const error = new Error('Permision deny for this task');
            return res.status(403).json({ msg: error.message });
        }
        res.json(task)
    } catch (error) {
        error = new Error('Task donst exist');
        return res.status(404).json({ msg: error.message });
    }

};
const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id).populate('project')
        if (task.project.host.toString() !== req.user._id.toString()) {
            const error = new Error('Permision deny for this task');
            return res.status(403).json({ msg: error.message });
        }
        try {
            await Task.findByIdAndDelete(id);
            return res.json({ msg: 'Tarea eliminada correctamente' })
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        error = new Error('Task donst exist');
        return res.status(404).json({ msg: error.message });
    }

};
const updateTask = async (req, res) => {

    const { id } = req.params
    try {
        const task = await Task.findById(id).populate('project')
        if (task.project.host.toString() !== req.user._id.toString()) {
            const error = new Error('Permision deny for this task');
            return res.status(403).json({ msg: error.message });
        }
        task.name = req.body.name || task.name
        task.description = req.body.description || task.description
        task.priority = req.body.priority || task.priority
        task.deadline = req.body.deadline || task.deadline
        try {
            const taskSave = await task.save()
            res.json(taskSave)
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        error = new Error('Task donst exist');
        return res.status(404).json({ msg: error.message });
    }

};
const changeStateTask = async (req, res) => {

};

export {
    addTask,
    getTask,
    deleteTask,
    updateTask,
    changeStateTask,
}