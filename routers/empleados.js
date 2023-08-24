import { Router } from "express";
import { connectDB } from "../db/atlas.js";
import { ObjectId } from "mongodb";
let Empleados = Router()

let db = await connectDB();

//7.Listar los empleados con el cargo de "Vendedor"
Empleados.get("/", async(req,res)=>{
    console.log(req.rateLimit);
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
        res.status(500).json({
            message: "No se pueden listar los empleados",
            error:error.message
        })
    }
})

//14.Mostrar los empleados con cargo de "Gerente" o "Asistente".

Empleados.get("/cargo", async (req,res)=>{
    console.log(req.rateLimit);
    try {
        let collection = db.collection("empleado")
        let data = await collection.find({cargo: { $in:["vendedor","gerente"]}})
        .toArray();
        res.send(data)
    } catch (error) {
        res.status(500).json({
            message: "No se pueden listar los empleados",
            error:error.message
        })
    }
})

export default Empleados;