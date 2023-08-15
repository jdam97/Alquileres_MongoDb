import {Router} from "express";
import { connectDB } from "../db/atlas.js";
import { limitRequest } from "../config/limit.js";
const Automovil = Router();


let db = await connectDB();


Automovil.use(limitRequest());

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

export default Automovil;