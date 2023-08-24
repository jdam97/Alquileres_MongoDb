import { Router } from "express";
import { connectDB } from "../db/atlas.js";
import { ObjectId } from "mongodb";
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
//15. Obtener los datos de los clientes que realizaron al menos un alquiler.
Cliente.get("/datos", async(req,res)=>{
    console.log(req.rateLimit);
    try {
        let collection = db.collection("cliente");
        let data = await collection.find({})
        .toArray()
        res.send(data)
        
    } catch (error) {
        res.status(500).json({
            message:"No se pueden listar los clientes",
            error:error.message
        })
    }
})


//10. Listar los clientes con el DNI específico.
Cliente.get("/:dni", async (req,res)=>{
    console.log(req.rateLimit);
    try {
        const {dni} = req.params;
        console.log(dni);
        let collection = db.collection("cliente");
        let data = await collection.find({DNI:dni})
        .toArray();
        res.send(data);
        
    } catch (error) {
        res.status(500).json({
            message:"Error al enlistar los clientes por el dn1",
            error: error.message
        })
    }
})




export default Cliente;
