import {Router} from "express";
import { connectDB } from "../db/atlas.js";
import { rateLimit } from "express-rate-limit";
const Automovil = Router();


let db = await connectDB();


//Endpoints

//3. Obtener todos los automóviles disponibles para alquiler.
//GET: traerme a todos los automoviles disponibles.

Automovil.get("/",async(req,res)=>{
    console.log(req.rateLimit);
    try {
        const collection = db.collection("automovil");
        const data = await collection.find({}).toArray()
        res.send(data)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al listar los Automoviles disponibles", 
            error:error.message,
        });
    }
})

//11. Mostrar todos los automóviles con una capacidad mayor a 5 personas.
Automovil.get("/capacidad", async(req,res)=>{
    console.log(res.rateLimit);
    try {
        const collection = db.collection("automovil");
        const data = await collection.find({Capacidad:{$gte:5}})
        .toArray()
        res.send(data)
        
    } catch (error) {
        res.status(500).json({
            message:"error al listar capacidad mayores a 5",
            error:error.message
        })
    }
})

//16. Listar todos los automóviles ordenados por marca y modelo.

Automovil.get("/marcas",async(req,res)=>{
    console.log(req.rateLimit);
    try {
        const collection = db.collection("automovil");
        let data = await collection.find({},{projection:{Marca:1,Modelo:1,_id:0}})
        .sort({ Marca: 1, Modelo: 1 }) //ordena la consulta
        .toArray();
        res.send(data)

    } catch (error) {
        res.status(500).json({
            message: "No se pueden listarlos automoviles por marca y modelo",
            error:error.message
        })
    }
})

export default Automovil;