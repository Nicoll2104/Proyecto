import mongoose from "mongoose";
const usuario = new mongoose.Schema(
    {
        cedula:{type:String, required: true,unique:true,minlength:7,maxlength:10},
        nombre:{type:String, required: true},
        apellido:{type:String, required:true},
        edad:{type:String},
        telefono:{type:String, required:true,minlength:10, maxlength:10},
        email:{type:String, required:true},
        contrasena:{type:String, required:true,minlength:8},
        maleta:{type:String, required:true,maxlength:3},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Usuario", usuario)
  