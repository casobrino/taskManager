import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import conectionDb from "./config/db.js";
import userRouts from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { Server } from 'socket.io'

const app = express();
app.use(express.json());
dotenv.config();
conectionDb();

//config cors
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            //can use the api
            callback(null, true)
        } else {
            //cant use api
            callback(new Error("Error de Cors"))
        }
    }
}
app.use(cors(corsOptions))
const PORT = process.env.PORT || 4000;

//routing
app.use('/api/users', userRouts);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const server = app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${PORT}`);
});

//Socket.io
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
});
io.on('connection', (socket) => {
    console.log('Conectado a socket.io');
    //Socketio Events
    socket.on('open project', (proyecto) => {
        socket.join(proyecto);
    })
    socket.on('new task', task => {
        const project = task.project;
        socket.to(project).emit('added task', task)
    })
    socket.on('delete task', task => {
        const project = task.project;
        socket.to(project).emit('deleted task', task);
    })
    socket.on('update task', task => {
        const project = task.project._id;
        socket.to(project).emit('updated task', task);
    })
    socket.on('change state', task =>{
        const project = task.project._id
        socket.to(project).emit('new state', task)
    })
})