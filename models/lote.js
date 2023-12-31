import mongoose from "mongoose";

const lote = new mongoose.Schema(
    {
        codigo_presupuestal:{type:String, required: true,},
        nombre:{type:String, required: true,},
        presupuesto_inicial:{type:Number, required: true,},
        año:{type:String, required: true},
        modificaciones:{type:String, required:true,},
        presupuesto_definitivo:{type:Number, required:true,},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Lote", lote)