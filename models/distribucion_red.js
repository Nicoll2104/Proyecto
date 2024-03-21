import mongoose from "mongoose";

const distribucion_red = new mongoose.Schema(
    {
        codigo_auxiliar:{type:Number, required: true},
        valor_presupuesto:{type:Number, required: true,},
        id_distribucion_dependencia:{type:mongoose.Schema.Types.ObjectId,ref:'distribucion_dependencia',required:true},
        id_red_conocimiento:{type:mongoose.Schema.Types.ObjectId,ref:'red_conocimiento',required:true},
        id_tipo_producto:{type:mongoose.Schema.Types.ObjectId,ref:'tipo_producto',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Distribucion_red", distribucion_red)