import mongoose from "mongoose";

const contrato  = new mongoose.Schema(
    {
        codigo:{type:Number, required: true},
        nombre:{type:String, required:true},
        presupuestoAsignado:{type:Number, required:true},
        presupuestoActual:{type:Number, required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Contrato", contrato)