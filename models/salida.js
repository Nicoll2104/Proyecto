import mongoose from "mongoose";

const salida = new mongoose.Schema(
    {
        fecha_entrega:{type:Date, required: true},
        entregado:{type:Boolean, required: true},
        idUsuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
        idPedido:{type:mongoose.Schema.Types.ObjectId,ref:'Pedido', require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Salida", salida)