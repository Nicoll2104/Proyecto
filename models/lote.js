import mongoose from "mongoose";

const lote = new mongoose.Schema(
    {
        nombre:{type:String, required: true,},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Lote", lote)