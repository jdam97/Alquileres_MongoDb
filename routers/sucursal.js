import { Router } from "express";
import { connectDB } from "../db/atlas.js";
import { ObjectId } from "mongodb";

let Sucursal = Router();

let db = await connectDB();


//8. Mostrar la cantidad total de automóviles disponibles en cada sucursal.
Sucursal.get("/", async (req,res)=>{
    console.log(req.rateLimit);
    try {
        let collection = db.collection("sucursal");
        let data = await collection.find({},{projection:{Nombre:1,Cantidad_Disponible:1,_id:0}}) //acá necesito projection
        .toArray();
        res.send(data)

    } catch (error) {
        res.status(500).json({ 
            message: "Error al listar sucursales",
            error:error.message
        });
    }
})



export default Sucursal;