import mongoose from "mongoose";

const salida = new mongoose.Schema(
    {
        fecha_entrega:{type:Date, required: true},
        entregado:{type:Boolean, required: true},
        idAdmin:{type:Number, required: true},
        idPedido:{type:String, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Salida", salida)