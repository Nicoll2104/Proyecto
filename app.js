import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import mongoose from "mongoose";
import usuario from './routes/usuario.js';
import lote from './routes/lote.js';
import ficha from './routes/ficha.js';
import producto from './routes/productos.js';
import items from './routes/items_presupuesto.js';
import distribucion_dependencia from './routes/Dis_dependencia.js';
import distribucion_ficha from './routes/distribucion_ficha.js';
import det_pedido from './routes/det_pedido.js';
import pedido from './routes/pedido.js';
import DisArea from './routes/distribucion_area.js';
import area_tematica from './routes/area_tematica.js';
import DisRed from './routes/distribucion_red.js';


mongoose.connect(process.env.mongoDB)
  .then(() => console.log('Connected to MongoDB'));

const app = express()
app.use(express.json())
app.use(cors());
app.use("/api/area_tematica", area_tematica)
app.use("/api/detPedido", det_pedido)
app.use("/api/disFicha", distribucion_ficha)
app.use("/api/disPresupues", distribucion_dependencia)
app.use("/api/ficha", ficha)
app.use("/api/items", items)
app.use("/api/lote", lote)
app.use("/api/producto", producto)
app.use("/api/pedido", pedido)
app.use("/api/usuario", usuario)
app.use("/api/disArea", DisArea)
app.use("/api/disRed",DisRed )



app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })