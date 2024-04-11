import mongoose from "mongoose";

const dis_red_area = new mongoose.Schema(
    {
        presupuesto_asignado:{type:Number, required:true},
        presupuesto_actual:{type:Number, required:true},
        ano:{type:Number,required:true},
        disRed:{type:mongoose.Schema.Types.ObjectId,ref:'Dis_dependecia_red',required:true},
        area:{type:mongoose.Schema.Types.ObjectId,ref:'Area_tematica',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    }
)

export default mongoose.model("Distribucion_red_area", dis_red_area)