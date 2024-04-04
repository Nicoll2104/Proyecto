import mongoose from "mongoose";

const dist_area_destino = new mongoose.Schema(
    {
        presupuesto_asignado:{type:Number, required: true},
        presupuesto_actual:{type:Number, required: true,},
        año:{type:Date, required: true,},
        idDistribucionRedArea:{type:mongoose.Schema.Types.ObjectId,ref:'Distribucion_Red_Area',required:true},
        idDestino:{type:mongoose.Schema.Types.ObjectId,ref:'Destino',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Dist_area_destino", dist_area_destino)