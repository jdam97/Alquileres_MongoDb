import dotenv from "dotenv";
import express from "express";

//Routers
import Cliente from "./routers/clientes.js";

dotenv.config();
const app = express();
app.use(express.json());

//Endpoints
app.use("/clientes",Cliente);







let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});