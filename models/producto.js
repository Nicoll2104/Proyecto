import mongoose from "mongoose";

const producto = new mongoose.Schema(
    {
        codigo:{type:String, required: true, unique:true,},
        nombre:{type:String, required: true,},
        descripcion:{type:String, required: true,},
        unidad_medida:{type:String, required:true,},
        precio_unitario:{type:Number, required:true,},
        impestos:{type:Number, required:true},
        fecha_creacion:{type:Date, required:true},
        fecha_vencimiento:{type:Date, required:true},
        id_proceso:{type:mongoose.Schema.Types.ObjectId,ref:'Proceso',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Producto", producto)