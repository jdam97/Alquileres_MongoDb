import dotenv from "dotenv";
import express from "express";

//Routers
import Cliente from "./routers/clientes.js";
import Automovil  from "./routers/automovil.js";
import Alquiler from "./routers/alquiler.js"

dotenv.config();
const app = express();
app.use(express.json());

//Endpoints
app.use("/clientes",Cliente);
app.use("/automoviles",Automovil);
app.use("/alquileres",Alquiler)







let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});