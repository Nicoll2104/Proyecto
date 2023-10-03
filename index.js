import express from "express";
import 'dotenv/config'
import usuario from "./routes/usuario.js";

const app = express()
app.use(express.json())

app.use( "/api/usuario", usuario);



app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })