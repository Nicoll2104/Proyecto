import mongoose from "mongoose";

const det_Salida = new mongoose.Schema(
    {
        cantidad_Entrega:{type:Number, required: true},
        idSalida:{type:mongoose.Schema.Types.ObjectId,ref:'Salida', require:true},
        idProducto:{type:mongoose.Schema.Types.ObjectId,ref:'Producto', require:true},
        cantidad_pendiente:{type:Number, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Det_Salida", det_Salida)