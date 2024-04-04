import mongoose from "mongoose";

const producto = new mongoose.Schema(
    {
        codigo:{type:Number, required: true, unique:true,},
        nombre:{type:String, required: true,},
        descripcion:{type:String, required: true,},
        unidad_medida:{type:String, required:true,},
        consumible:{type:Boolean, required: true,},
        precio_unitario:{type:Number, required:true,},
        iva:{type:Number, required:true},
        lote:{type:mongoose.Schema.Types.ObjectId,ref:'Lote',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Producto", producto)