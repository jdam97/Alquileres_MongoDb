import { Router } from "express";
import { connectDB } from "../db/atlas.js";
import { ObjectId } from "mongodb";
import { rateLimit } from "express-rate-limit";
let Empleados = Router()

let db = await connectDB();

//7.Listar los empleados con el cargo de "Vendedor"
Empleados.get("/", async(req,res)=>{
    console.log(rateLimit);
    try {
        let collection = db.collection("empleado");
        let data = await collection.aggregate([
            {
                $match: {cargo:"vendedor"}
            }
        ])
        .toArray();
        res.send(data);

    } catch (error) {
        
    }
})

export default Empleados;