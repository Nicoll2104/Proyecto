import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import mongoose from "mongoose";
import usuario from './routes/usuario.js';
import lote from './routes/lote.js';

const app = express()
app.use(express.json())
app.use(cors());

app.use("/api/usuario", usuario)
app.use("/api/lote", lote)

mongoose.connect('mongodb://127.0.0.1:27017/final')
  .then(() => console.log('Connected!'));

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })