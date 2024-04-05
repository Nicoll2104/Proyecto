import mongoose from "mongoose";

const pedido = new mongoose.Schema(
    {
        fecha_creacion:{type:Date, required: true},
        fecha_entrega:{type:Date, required: true},
        completado:{type:Boolean, required: true},
        instructor_encargado:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario', require:true},
        destino:{type:mongoose.Schema.Types.ObjectId,ref:'Destino', require:true},
        total:{type:Number, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

 export default mongoose.model("Pedido", pedido)