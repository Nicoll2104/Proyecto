import mongoose from "mongoose";

const tipo_producto = new mongoose.Schema(
    {
        codigo:{type:Number, required: true},
        nombre:{type:String, required: true,},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Tipo_producto", tipo_producto)