import express from 'express';
import {
    addTask,
    getTask,
    deleteTask,
    updateTask,
    changeStateTask,
} from '../controllers/taskController.js';
import checkAuth from '../middleware/checkout.js';

const router = express.Router();

router.post('/', checkAuth, addTask)
router
    .route('/:id')
    .get(checkAuth, getTask)
    .put(checkAuth, updateTask)
    .delete(checkAuth, deleteTask)
router.post('/state/:id', checkAuth, changeStateTask)

export default router