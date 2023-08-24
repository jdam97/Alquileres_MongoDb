import { Router } from "express";
import { connectDB } from "../db/atlas.js";
import { ObjectId } from "mongodb"; //exporto objectId para cuando tenga que buscar en alguna consulta por id de mongodb

let Registro = Router();

let db = await connectDB();

//13.Listar las reservas pendientes realizadas por un cliente específico.
Registro.get("/reservas/:dni", async(req,res)=>{
    console.log(req.rateLimit);
    try {
        let {dni} = req.params
        let collection = db.collection("contrato");
        let data = await collection.aggregate([
            {
                $match:{Tipo: "Reserva",Estado:"Pendiente"}  
            },
            {
                $lookup:{
                    from:"cliente",
                    localField:"ID_Cliente",
                    foreignField:"ID",
                    as:"reserva_cliente"
                }
            },
            {
                $match:{"reserva_cliente.DNI":dni}
            },
            {
                $unwind: "$reserva_cliente" 
            },
            {
                $project:{
                    reserva_cliente:0,
                    _id:0
                }
            }

        ])
        .toArray();
        res.send(data[0])
        
    } catch (error) {
        res.status(500).json({
            message: "No se pueden listar la información",
            error: error.message
        })
    }
})

export default Registro;
