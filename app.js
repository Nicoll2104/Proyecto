import express from "express";
import 'dotenv/config'
import cors from 'cors'
import usuario from "./models/usuario.js";
import mongoose from "mongoose";

const app = express()
app.use(express.json())
app.use(cors());

app.use( "/api/usuario", usuario);

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })