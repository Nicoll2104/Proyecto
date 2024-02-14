import mongoose from "mongoose";

const distribucion_presupuesto = new mongoose.Schema(
    {
        codigo_presupuestal:{type:String, required: true,},
        nombre:{type:String, required: true,},
        presupuesto_inicial:{type:Number, required: true,},
        ano:{type:String, required: true,},
        lote:{type:mongoose.Schema.Types.ObjectId,ref:'lote', require:true},
        items:{type:mongoose.Schema.Types.ObjectId,ref:'items', require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Distribucion_presupuesto", distribucion_presupuesto)