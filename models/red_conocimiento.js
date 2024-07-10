import mongoose from "mongoose";

const red_conocimiento = new mongoose.Schema(
    {
        nombre:{type:String, required: true,},
        Id_depedencias:{type:mongoose.Schema.Types.ObjectId,ref:'Dependencia',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Red_conocimiento", red_conocimiento)