import express from 'express';
import {
    getProjects,
    getProject,
    newProject,
    editProject,
    deleteColaborator,
    deleteProject,
    addColaborator,
} from '../controllers/projectController.js';
import checkAuth from '../middleware/checkout.js';

const router = express.Router();

router.route('/').get(checkAuth, getProjects).post(checkAuth, newProject)
router.route('/:id')
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .delete(checkAuth, deleteProject)
router.post('/add-colaborator/:id', checkAuth, addColaborator)
router.post('/delete-colaborator/:id', checkAuth, deleteColaborator)

export default router