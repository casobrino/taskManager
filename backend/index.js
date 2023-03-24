import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import conectionDb from "./config/db.js";
import userRouts from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectionDb();

//config cors
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        //console.log(origin, 'new conection');
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

app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${PORT}`);
});