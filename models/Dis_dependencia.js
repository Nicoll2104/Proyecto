import mongoose from "mongoose";

const distribucion_Dependencia = new mongoose.Schema(
    {
        codigo_presupuestal:{type:String, required: true,},
        presupuesto_inicial:{type:Number, required: true,},
        ano:{type:String, required: true,},
        dependencia:{type:mongoose.Schema.Types.ObjectId,ref:'Dependencia', require:true},
        items:{type:mongoose.Schema.Types.ObjectId,ref:'Items_presupuesto', require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Distribucion_Dependencias", distribucion_Dependencia)