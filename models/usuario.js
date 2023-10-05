import mongoose from "mongoose";

const usuario = new mongoose.Schema(
    {
        nombre:{type:String, required: true,},
        cedula:{type:String, required: true, unique:true,},
        correo:{type:String, required: true},
        telefono:{type:String, required:true,minlength:10, maxlength:10},
        contrasena:{type:String, required:true,minlength:8},
        rol:{type:String, required:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:String,default:1}
    })

    export default mongoose.model("Usuario", usuario)
