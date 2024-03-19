import mongoose from "mongoose";

const area_tematica = new mongoose.Schema(
    {
        codigo:{type:String, required: true},
        nombre:{type:String, required: true,},
        id_red_conocimiento:{type:mongoose.Schema.Types.ObjectId,ref:'red_conocimiento',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1} 
    })

    export default mongoose.model("Area_tematica", area_tematica)