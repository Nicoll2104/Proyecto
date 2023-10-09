import mongoose from "mongoose";

const usuario = new mongoose.Schema(
    {
        codigo_presupuestal:{type:String, required: true,},
        nombre:{type:String, required: true,},
        presupuesto_inicial:{type:Number, required: true,},
        ano:{type:Date, required: true},
        modificaciones:{type:Number, required:true,},
        presupuesto_difinitivo:{type:Number, required:true,},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Lotes", usuario)