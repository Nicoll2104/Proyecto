import mongoose from "mongoose";

const dependecia = new mongoose.Schema(
    {
        codigo:{type:String, required: true,},
        nombre:{type:String, required: true,},
        año:{type:String, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Dependencia", dependecia)