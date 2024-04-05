import  mongoose  from "mongoose";

const provedor = new mongoose.Schema(
    {
        nombre:{type:String, required: true},
        dni:{type:String, required: true},
        correo:{type:String, required: true},
        telefono:{type:Number, required: true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Provedor",provedor)