import mongoose from "mongoose";

const lote = new mongoose.Schema(
    {
        codigo:{type:String, required: true,},
        nombre:{type:String, required: true,},
        año:{type:Number, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Lote", lote)