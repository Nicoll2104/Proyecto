import mongoose from "mongoose";

const dis_contrato_lote = new mongoose.Schema(
    {
        codigo_auxiliar:{type:Number, required:true},
        presupuesto_asignado:{type:Number, required: true},
        presupuesto_actual: {type:Number, required: true},
        ano: {type:Number, required: true},
        contrato:{type:mongoose.Schema.Types.ObjectId,ref:'Contrato',required:true},
        lote:{type:mongoose.Schema.Types.ObjectId,ref:'Lote',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    }
)

export default mongoose.model("Dis_contrato_lote", dis_contrato_lote)