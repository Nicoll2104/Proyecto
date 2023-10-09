import mongoose from "mongoose";
const distribucion_ficha = new mongoose.Schema(
    {
        id_distribucion_ficha:{type:String, required: true},
        presupuesto:{type:Number, required: true},
        distribucion_presupuesto:{type:mongoose.Schema.Types.ObjectId,},
        ficha:{type:mongoose.Schema.Types.ObjectId,ref:'ficha',required:true},
    }
)