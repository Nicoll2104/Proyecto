import mongoose from "mongoose";

const entrada = new mongoose.Schema(
    {
        cantidad:{type:Number, required: true},
        total:{type:Number, required: true,},
        idProducto:{type:mongoose.Schema.Types.ObjectId,ref:'Producto',required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
        
    })

    export default mongoose.model("Entrada", entrada)