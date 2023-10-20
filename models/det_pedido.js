import mongoose from "mongoose";

const det_pedido = new mongoose.Schema(
    {
        cantidad:{type:Number, required: true,},
        pedido_id:{type:mongoose.Schema.Types.ObjectId,ref:'pedido', require:true}, 
        producto_id:{type:mongoose.Schema.Types.ObjectId,ref:'producto', require:true}, 
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Det_pedido", det_pedido)