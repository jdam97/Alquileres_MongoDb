import dotenv from "dotenv";
import express from "express";
import { limitRequest } from "./config/limit.js"; //importo limite de peticiones

//Routers
import Cliente from "./routers/clientes.js";
import Automovil  from "./routers/automovil.js";
import Contrato from "./routers/contratos.js";
import Empleados from "./routers/empleados.js"

dotenv.config();
const app = express();
app.use(express.json());

//Endpoints
app.use("/clientes",limitRequest(),Cliente);
app.use("/automoviles",limitRequest(),Automovil);
app.use("/contratos",limitRequest(),Contrato);
app.use("/empleados",limitRequest(),Empleados);






let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});