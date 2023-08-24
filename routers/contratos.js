import { Router} from "express";
import {connectDB} from "../db/atlas.js"; //conexion con atlas
import { ObjectId } from "mongodb"; //exporto objectId para cuando tenga que buscar en alguna consulta por id de mongodb
import { IsTimeZone } from "class-validator";
import { rateLimit } from "express-rate-limit";

const Contrato = Router();
let db = await connectDB();

//Peticiones

//4.Listar todos los alquileres activos junto con los datos de los clientes relacionados.
Contrato.get("/alquileres", async(req,res)=>{
    console.log(req.rateLimit);
    try{
        const collection = db.collection("contrato");
        const data = await collection.aggregate([
            { 
                $match: { Estado: 'Activo' } 
            },
        
        {
            $lookup: { // innerjoin en SQL
                from: "cliente", //desde: acá se coloca la tabla que deseo enlazar
                localField: "ID_Cliente", // el campo el cual es foraneo con la tabla que puse arriba que deseo enlazar
                foreignField: "ID", //el iD este caso de cliente
                as:"Alquiler_activo",
            }
        },
        {
            $unwind: "$Alquiler_activo"
            //Desestructura y me pone los datos en campos individuales, no en un array
        },
        {
            $project: { // $ project: sirve para omitir algunos campos que no quiero que me traiga en la solicitud
                _id: 0,
                Fecha_Inicio : 0,
                Fecha_Fin : 0,
                ID_Cliente :0,  
                ID_Automovil : 0,
                "Alquiler_activo._id" : 0
        },
            },
        {
            $group: { //agrupar todo en 1 sola respuesta
                _id: '$ID',
                contratos: {
                    $push: '$$ROOT'
                }
            }
        },
        ])
        .toArray();
        res.send(data);
    }catch (error) {
        res.status(500).json({
          message: "Error al listar los alquiler",
          error: error.message,
        });
      }
})

//5. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado
Contrato.get("/reservas", async (req,res)=>{
    console.log(req.rateLimit);
    try {
        const collection = db.collection("contrato")
        const data = await collection.aggregate([
            {
                $match:{Estado:"Pendiente"}
            },
            {
                $lookup: {
                    from: "automovil", //Colección a la que se hace referencia para unir los datos
                    localField: "ID_Automovil", // Campo en la colección actual que se utiliza como referencia
                    foreignField: "ID", // Campo en la colección "cliente" que se usa para la unión
                    as:"Alquiler_automovil",// Nombre del nuevo campo que contendrá los documentos unidos
                },
            },
            {
                $unwind: "$Alquiler_automovil" // no olvidar el $
            },
            {
                $project:{
                    _id: 0,
                    Fecha_Inicio : 0,
                    Fecha_Fin : 0,
                    ID_Cliente :0,
                    ID_Automovil : 0,
                    "Alquiler_automovil._id" : 0
                }
            },
            {
                $group:{
                    _id: '$ID',
                    contratos: {
                    $push: '$$ROOT'
                    }
                }
            }
        ])
        .toArray();
        res.send(data)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al enlistar contratos con automoviles",
            error:error.message
        })
    }
})

//6.Obtener los detalles del alquiler con el ID_Alquiler específico.
Contrato.get("/detalles/:ID", async(req,res)=>{
    console.log(req.rateLimit);
    const id = req.params.ID
    console.log(id);
    try {
       let collection = db.collection("contrato");
       const data = await collection.find({ID:parseInt(id)}).toArray()
       res.send(data)
    } catch (error) {
        console.log(error);
    }
});

//6.1.Obtener los detalles por el ID (otra forma)
Contrato.get("/detalles1/:id",async(req,res)=>{
    console.log(req.rateLimit);
    const {id} = req.params;
    console.log(id);
    try {
        const collection = db.collection("contrato");
        const data = await collection.find( {_id: new ObjectId(id)})
        .toArray();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Error al enlistar detalles de los contratos",
            error:error.message
        })
    }
})

//9.Obtener el costo total de un alquiler específico.
Contrato.get("/costo/:id", async(req,res)=>{
    console.log(req.rateLimit);
    
    try {
        const {id} = req.params;
        console.log(id);
        let collection = db.collection("contrato");
        let data = await collection.find({_id:new ObjectId(id)},{$projection: {Costo_Total:1,_id:0}})
        .toArray();
        res.send(data[0])
    } catch (error) {
        res.status(500).json({
            message: "Error al encontrar el id",
            error: error.message
        })
    }
})

//12.Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.
Contrato.get("/detalles", async (req,res)=>{
    console.log(req.rateLimit);
    try {
        let collection = db.collection("contrato");
        let data = await collection.find({Fecha_Inicio:{$eq:new Date("2023-07-05")}})
        .toArray();
        res.send(data)

    } catch (error) {
        error.status(500).json({
            message:"Error al enlistar detalles de alquileres",
            error:error.message
        })
    }
})





export default Contrato;