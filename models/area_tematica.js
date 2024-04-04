import mongoose from "mongoose";

const area_tematica = new mongoose.Schema(
    {
        nombre:{type:String, required: true,},
        status:{type:String,default:1} 
    })

    export default mongoose.model("Area_tematica", area_tematica)