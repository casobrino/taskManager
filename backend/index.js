import express from "express";
import dotenv from "dotenv";
import conectionDb from "./config/db.js";
import userRouts from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
conectionDb();
const PORT = process.env.PORT || 4000;

//routing
app.use('/api/users', userRouts);

app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${PORT}`);
});