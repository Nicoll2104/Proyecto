import mongoose from "mongoose";

const dist_lote_depen = new mongoose.Schema(
    {
        presupuesto_asignado:{type:Number, required:true},
        presupuesto_actual:{type:Number, required:true},
        disContratoLote:{type:mongoose.Schema.Types.ObjectId,ref:'Dis_contrato_lote',required:true},
        disdepen:{type:mongoose.Schema.Types.ObjectId,ref:'Dependencia',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

export default mongoose.model("Dis_lote_dependencia",dist_lote_depen)