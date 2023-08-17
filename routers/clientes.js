import { Router } from "express";
import { connectDB } from "../db/atlas.js";
const Cliente = Router();

let db = await connectDB();


//Endpoints

//2. Mostrar todos los clientes registrados en la base de datos.
//GET: traerme a todos los clientes
Cliente.get("/", async (req,res) =>{
    console.log(req.rateLimit);
    try {
        const collection = db.collection("cliente");
        const data = await collection.find({}).toArray(); // .find es para traerme todos los datos de una tabla
        res.send(data);
    } catch (error){
        // console.log(error);
        res.status(500).json({
            message: "Error al listar los clientes", 
            error:error.message,
        });
    }
});

export default Cliente;
