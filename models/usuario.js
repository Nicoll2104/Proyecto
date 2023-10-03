import mongoose from "mongoose";
const usuario = new mongoose.Schema(
    {
        nombre: {type: String, require:true},
        cedula: {type:String, require:true},
        correo: {type:String, require:true},
        contrasena: {type:String, require:true},
        telefono: {type:String, require:true},
        rol:{type:String, require:true},
        createdAt: { type: Date, default: Date.now },
        status:{type:Number,default:1},
    })
    
    export default mongoose.model("Usuario", usuario)