import mongoose from "mongoose";

const dependencia = new mongoose.Schema(
    {
        codigo:{type:String, required: true},
        nombre:{type:String, required: true,},
        vigencia:{type:Date, required: true,},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Dependencia", dependencia)