import { Router } from "express";
import { connectDB } from "../db/atlas.js";
import { ObjectId } from "mongodb"; //exporto objectId para cuando tenga que buscar en alguna consulta por id de mongodb

let Registro = Router();

let db = await connectDB();

//13.Listar las reservas pendientes realizadas por un cliente específico.
Registro.get("/reservas", async(req,res)=>{
    console.log(req.rateLimit);
    try {
        let {dni} = req.params
        let collection = db.collection("contrato");
        let data = await collection.aggregate([
            {
                $match: ID_Cliente = dni
            },
            {
                $lookup:{
                    from: "cliente",
                    localField: "ID_Cliente",
                    foreignField: "ID",
                    as: "reservas"
                }
            },
            {
                $unwind: "$reservas"
            },
            {
                $lookup
            }

        ])
        .toArray();
        res.send(data)
        
    } catch (error) {
        res.status(500).json({
            message: "No se pueden listar la información",
            error: error.message
        })
    }
})

export default Registro;
