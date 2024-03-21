import mongoose from "mongoose";

const red_conocimiento = new mongoose.Schema(
    {
        codigo:{type:String, required: true},
        nombre:{type:String, required: true,},
        id_dependencia:{type:mongoose.Schema.Types.ObjectId,ref:'Dependencia',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Red_conocimiento", red_conocimiento)