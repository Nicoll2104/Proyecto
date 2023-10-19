import mongoose from "mongoose";

const items = new mongoose.Schema(
    {
        codigo_presupuesto:{type:String, required: true},
        nombre:{type:String, required: true,},
        presupuesto_inicial:{type:Number, required: true},
        año:{type:String, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Items_presupuesto", items)