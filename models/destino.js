import mongoose from "mongoose";

const destino = new mongoose.Schema(
    {
        codigo:{type:Number, required: true,},
        nombre:{type:String, required: true, unique:true,},
        nivel_de_formacion:{type:String, required: true},
        fecha_inicio:{type:Date, required:true},
        fecha_fin:{type:Date, required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Destino", destino)