import { Router} from "express";
import {connectDB} from "../db/atlas.js"; //conexion con atlas
import { limitRequest } from "../config/limit"; //importo limite de peticiones
import { ObjectId } from "mongodb"; //exporto objectId para cuando tenga que buscar en alguna consulta por id de mongodb

const Alquiler = Router();
let db = await connectDB();

Alquiler.use(limitRequest);//coloco el limite de solicitudes para todas las consultas de este archivo

//Peticiones

//get all
Alquiler.get("/", async(req,res)=>{
    try{
        const collection = db.collection("contrato");
        const data = await collection
        .aggregate([
            {
                $lookup: { // innerjoin en SQL
                    from: "contrato",
                    localField: "DNI",
                    foreignFIeld: "ID_cliente",
                    as: "Alquiler_activo",
                }
            },
            {
                $unwind: "$Alquiler_activo"
            },
            {
                $match: { "Alquiler_activo.estado":{$eq: "ACTIVO"} }
            },
            {
                $group: {
                    _id: "$_id",
                    nombre:{
                        $first: "nombre"
                    },
                    apellido:{
                        $first: "apellido"
                    },
                    DNI: {
                        $first: "$DNI"
                    },
                    telefono: {
                        $first: "$telefono"
                    },
                    Alquiler_activo: {$push: "$Alquiler_activo" }
                }
            }
        ])
        .toArray();
        res.send(data)
    }catch (error) {
        es.status(500).json({
          message: "Error al listar los alquiler",
          error: error,
        });
      }
})