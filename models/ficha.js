import mongoose from "mongoose";

const ficha = new mongoose.Schema(
    {
        codigo_ficha:{type:Number, required: true,},
        nombre:{type:String, required: true, unique:true,},
        nivel_de_formacion:{type:String, required: true},
        fecha_inicio:{type:Date, required:true},
        fecha_fin:{type:Date, required:true},
        area_tematica:{type: mongoose.Schema.Types.ObjectId, ref: "Area_tematica", required: true },
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Ficha", ficha)