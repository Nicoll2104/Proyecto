import mongoose from "mongoose";

const dis_dependencias = new mongoose.Schema(
    {
        codigo_auxiliar:{type:Number, required: true, unique:true,},
        valor_presupuesto:{type:Number, required: true,},
        id_item_presupuesto:{type:mongoose.Schema.Types.ObjectId,ref:'Item_presupuesto',required:true},
        id_dependencias:{type:mongoose.Schema.Types.ObjectId,ref:'Dependencia',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Dis_dependencias", dis_dependencias)