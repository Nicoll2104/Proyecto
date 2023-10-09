import mongoose from "mongoose";

const area = new mongoose.Schema(
    {
        nombre:{type:String, required: true,},
        presupuesto:{type:Number, required: true,},
        ficha_id:{type:mongoose.Schema.Types.ObjectId,ref:'Ficha', require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Area", area)