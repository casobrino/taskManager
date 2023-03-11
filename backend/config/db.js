import mongoose from "mongoose";

const conectionDb = async () =>{
    try {
        const conection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        const url = `${conection.connection.host}:${conection.connection.port}`
        console.log(`conected: ${url}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectionDb;