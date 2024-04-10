import mongoose from "mongoose";

const dis_depen_red = new mongoose.Schema(
    {
        presupuesto_asignado:{type:Number, required:true},
        presupuesto_actual:{type:Number, required:true},
        ano:{type:Number,required:true},
        disdepen:{type:mongoose.Schema.Types.ObjectId,ref:'Distribucion_Dependencias',required:true},
        redconoci:{type:mongoose.Schema.Types.ObjectId,ref:'Red_conocimiento',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    }
)

export default mongoose.model("Dis_dependecia_red", dis_depen_red)