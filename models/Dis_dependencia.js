import mongoose from "mongoose";

const distribucion_dependencia = new mongoose.Schema(
    {
        codigo_presupuestal:{type:String, required: true,},
        presupuesto_asignado:{type:Number, required: true,},
        presupuesto_actual:{type:Number, required: true,},
        ano:{type:String, required: true,},
        dependencia:{type:mongoose.Schema.Types.ObjectId,ref:'Dependencia', require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Distribucion_Dependencias", distribucion_dependencia)