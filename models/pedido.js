import mongoose from "mongoose";

const pedido = new mongoose.Schema(
    {
        fecha_creacion:{type:Date, required: true,},
        fecha_entrega:{type:Date, required: true,},
        /* id_distribucion_lote_ficha:{type:mongoose.Schema.Types.ObjectId,ref:'distribucion_lote_ficha', require:true}, */
        instructor_encargado:{type:String, required: true,},
        subtotal:{type:Number, required: true,},
        total:{type:Number, required: true,},
        estado_solicitud:{type:String, required: true,},
        ficha_id:{type:mongoose.Schema.Types.ObjectId,ref:'ficha', require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Pedido", pedido)