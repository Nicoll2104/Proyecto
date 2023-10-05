import bcryptjs from "bcrypt";
import usuario from "../models/usuario.js"; 

const httpUsuarios = {
    getUsuarios: async (req, res)=>{
        const usuarios = await usuario.find()
        res.json(usuarios);
    },

    getUsuariosid: async(req, res)=>{
      const {id}=req.params
      try {
          const usuarios = await usuario.findById(id)
          res.json({ usuarios })
          
      } catch (error) {
          res.status(400).json({error: 'No se encontro el id'})
      }
    },

    postUsuarios: async (req, res) => {
      try {
        const { cedula, nombre, apellido, edad, telefono, email, contrasena, maleta } = req.body;
        const usuarios = new usuario({ cedula, nombre, apellido, edad, telefono, email, contrasena, maleta });
    
        const salt = bcryptjs.genSaltSync();
        usuarios.contrasena = bcryptjs.hashSync(contrasena, salt);
    
        await usuarios.save();
        res.json({ mensaje: 'Cliente agregado con éxito'});
      } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor'});
      }
    },

    putUsuarios: async (req, res) => {
      const { id } = req.params;
      const { telefono, email, contrasena } = req.body;
    
      const salt = bcryptjs.genSaltSync();
      const Contrasena = bcryptjs.hashSync(contrasena, salt);
    
      try {
        const usuarios = await usuario.findByIdAndUpdate(id, { telefono, email, contrasena: Contrasena }, { new: true });
        
        if (!usuarios) {
          return res.status(404).json({ mensaje: 'El cliente no existe' });
        }
    
        res.json({ mensaje: 'Cliente actualizado con éxito', usuarios });
      } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    },

    deleteUsuarios: async (req, res) => {
      try {
        const { id } = req.params;
        const usuarios = await usuario.findByIdAndDelete( id ); 
      
        if (!usuarios) {
          return res.status(404).json({ mensaje: 'El cliente no existe' });
        }
    
        res.json({ mensaje: 'El cliente ha sido eliminado' });
      } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al intentar eliminar al cliente' });
      }
    },

    putInactivar: async (req,res)=>{
      try {
          const {id}=req.params
          const usuarios=await usuario.findByIdAndUpdate(id,{status:0},{new:true})
          res.json({usuarios})
      } catch (error) {
          res.status(400).json({error: 'Se produjo un error'})
          
      }
    },

    putActivar: async (req,res)=>{
      try {
          const {id}=req.params
          const usuarios=await usuario.findByIdAndUpdate(id,{status:1},{new:true})
          res.json({usuarios})
      } catch (error) {
          res.status(400).json({error: 'Se produjo un error'})
      }
    }

} 
export default httpUsuarios;