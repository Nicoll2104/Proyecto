import mongoose from "mongoose";

const pedido = new mongoose.Schema(
    {
        fecha_creacion:{type:Date, required: true},
        fecha_entrega:{type:Date, required: true},
        instructor_encargado:{type:String, required: true},
        subtotal:{type:Number, required: true},
        total:{type:Number, required: true},
        impuestos:{type:Number, required: true},
        distribucion_ficha:{type:mongoose.Schema.Types.ObjectId,ref:'distribucion_ficha', require:true},
        uruario:{type:mongoose.Schema.Types.ObjectId,ref:'usuario', require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

 export default mongoose.model("Pedido", pedido)