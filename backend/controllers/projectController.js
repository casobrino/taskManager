import mongoose from 'mongoose';
import Project from '../models/Project.js'
import User from '../models/User.js'

const getProjects = async (req, res) => {
    const projects = await Project.find({
        '$or': [
            {
                'colaborators': {
                    $in: req.user
                }
            },
            {
                'host': {
                    $in: req.user
                }
            }
        ]
    }).select('-taks');
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
    const project = await Project.findById(id).populate({ path: 'tasks', populate: { path: 'completed', select: 'name'} }).populate('colaborators', "name email");
    if (!project) {
        const error = new Error('Project dont exist');
        return res.status(404).json({ msg: error.message });
    }
    if (project.host.toString() !== req.user._id.toString() && !project.colaborators.some(colaborador => colaborador._id.toString() === req.user._id.toString())
    ) {
        const error = new Error("Permision deny");
        return res.status(401).json({ msg: error.message });
    }
    res.json(
        project,
    );
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
const findColaborator = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email }).select('-confirm -createdAt -token -password -updatedAt -__v')
        if (!user) {
            const error = new Error("Usuario no encontrado")
            return res.status(404).json({ msg: error.message })
        }
        res.json(user)

    } catch (error) {
        console.log(error.response);
    }

}
const addColaborator = async (req, res) => {
    const project = await Project.findById(req.params.id)
    if (!project) {
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({ msg: error.message })
    }

    if (project.host.toString() !== req.user._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(404).json({ msg: error.message })
    }

    const { email } = req.body
    const user = await User.findOne({ email }).select('-confirm -createdAt -token -password -updatedAt -__v')
    if (!user) {
        const error = new Error("Usuario no encontrado")
        return res.status(404).json({ msg: error.message })
    }

    //El colaboradior no es el admin del proyecto
    if (project.host.toString() === user._id.toString()) {
        const error = new Error("No te puedes agregar a ti mismo como colaborador")
        return res.status(404).json({ msg: error.message })
    }

    //Revisar que no este ya agregado al proyecto
    if (project.colaborators.includes(user._id)) {
        const error = new Error("El usuario ya pertenece al proyecto")
        return res.status(404).json({ msg: error.message })
    }

    //Correcto
    project.colaborators.push(user._id);
    await project.save()
    res.json({ msg: "Colaborador agregado correctamente" })
}
const deleteColaborator = async (req, res) => {
    const project = await Project.findById(req.params.id)
    if (!project) {
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({ msg: error.message })
    }

    if (project.host.toString() !== req.user._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(404).json({ msg: error.message })
    }

    //Correcto
    project.colaborators.pull(req.body.id);
    await project.save()
    res.json({ msg: "Colaborador eliminado correctamente" })

}


export {
    getProjects,
    getProject,
    newProject,
    editProject,
    deleteColaborator,
    deleteProject,
    addColaborator,
    findColaborator
}