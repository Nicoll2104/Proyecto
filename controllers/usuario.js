import bcryptjs from "bcryptjs";
import usuario from "../models/usuario.js";
import { generarJWT, validarJWT } from "../middlewares/validar.js";

const httpUsuario = {
    getUsuario: async (req,res)=>{
        const usuarios  = await usuario.find()
        res.json(usuarios);
    },

    getUsuarioid: async (req,res)=>{
        const {id}= req.params
        try{
            const usuarios = await usuario.findById(id)
            res.json({usuarios})
        }catch(error){
            res.status(400).json({error:'no encontramos el id'})
        }
    },

    postUsuario: async (req,res)=>{
        try{
            const {nombre, cedula, correo, telefono, contrasena,rol}=req.body;
            const usuarios = new usuario({nombre, cedula, correo, telefono, contrasena,rol});
            
            const salt = bcryptjs.genSaltSync();
            usuarios.contrasena =bcryptjs.hashSync(contrasena, salt)

            await usuarios.save();
            res.json({mensaje: 'Cliente agregado con éxito'})
        } catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    putUsuario: async (req,res) =>{
        const {id} = req.params;
        const {nombre, cedula, correo, telefono, contrasena,rol} = req.body;

        const salt = bcryptjs.genSaltSync();
        const Contrasena =bcryptjs.hashSync(contrasena, salt)
    
        try{
            const usuarios  = await usuario.findByIdAndUpdate(id, { nombre, cedula, correo, telefono,rol, contrasena: Contrasena }, { new: true });

            if(!usuarios){
                return res.status(404).json({mensaje: 'El cliente no existe' })
            }
            res.json({ mensaje: 'Usuario actualizado con éxito', usuarios });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteUsuario: async (req,res) =>{
        try{
            const {id} = req.params;
            const usuarios = await usuario.findByIdAndDelete(id);

            if(!usuarios){
                return res.status(404).json({ mensaje: 'El Usuario no existe' });
            }
            res.json({ mensaje: 'El usuario ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el usuario' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const usuarios = await usuario.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({usuarios})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const usuarios = await usuario.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({usuarios})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

login: async (req,res) =>{
    const {correo, contrasena}=req.body;

    try{
        const usuarios = await usuario.findOne({correo})
        if (!usuarios){
            return res.status(400).json({
                mensaje: "el usuario o la contraseña no son correctos"
            })
        }

        if(usuarios.status ==0){
            return res.status(400).json({
                mensaje:"Usuario inactivo"
            });
        }


        const validcontrasena = bcryptjs.compareSync(contrasena, usuarios.contrasena);
        if(!validcontrasena){
            return res.status(401).json({
                mensaje:"el usuario o la contraseña no son correctos"
            })
        }


        const token = await generarJWT(usuarios.id);

        res.json({
            usuarios,
            token
        })

    }catch (error){
        return res.status(500).json({
            mensaje:"Habla con el webMaster"
        })
    }
},

validartoken: async (req,res) =>{
    const { token } = req.body;
    try{

        console.log('token resivido: ', token)
        const x = await validarJWT(token)
        console.log('token validado: ', x)
        res.json({
            x
        })
    }catch (error){
        return res.status(500).json({
            mensaje:"token no valido"
        })
    }
},
    
}

export default httpUsuario;