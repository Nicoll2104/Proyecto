import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import mongoose from "mongoose";
import usuario from './routes/usuario.js';
import lote from './routes/lote.js';
import destino from './routes/destino.js';
import producto from './routes/producto.js';
import dependencia from './routes/dependencia.js';
import distribucion_dependencia from './routes/Dis_dependencia.js';
import dis_contrato_lote from './routes/dis_contrato_lote.js';
import det_pedido from './routes/det_pedido.js';
import pedido from './routes/pedido.js';
import DisAreaDes from './routes/dist_area_destino.js';
import area_tematica from './routes/area_tematica.js';
import ConLoteRed from './routes/conexion_lote_red.js';
import entrada from './routes/entrada.js';
import contrato from './routes/contrato.js';
import redconocimiento from './routes/red_conocimiento.js';
import det_Salida from './routes/det_Salida.js';
import provedor from './routes/provedor.js';
import salida from './routes/salida.js';
import DisDepRed from './routes/dis_depen_red.js';

mongoose.connect(process.env.mongoDB)
  .then(() => console.log('Connected to MongoDB'));

const app = express()
app.use(express.json())
app.use(cors());
app.use("/api/area_Tematica", area_tematica)
app.use("/api/detPedido", det_pedido)
app.use("/api/disConLote", dis_contrato_lote)
app.use("/api/disDependencia", distribucion_dependencia)
app.use("/api/destino", destino)
app.use("/api/dependencia", dependencia)
app.use("/api/lote", lote)
app.use("/api/producto", producto)
app.use("/api/pedido", pedido)
app.use("/api/usuario", usuario)
app.use("/api/disAreaDes", DisAreaDes)
app.use("/api/conLoteRed",ConLoteRed )
app.use("/api/entrada", entrada)
app.use("/api/contrato", contrato)
app.use("/api/redConomiento", redconocimiento)
app.use("/api/detSalida", det_Salida)
app.use("/api/provedor",provedor)
app.use("/api/salida", salida)
app.use("/api/disDepRed", DisDepRed)

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })