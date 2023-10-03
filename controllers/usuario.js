import usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar.js";

const httpUsuario = {
getUsuario: async(req,res)=>{
    try{
        const usuarios = await usuario.find()
    res.json(usuarios)
    }catch(error){
        res.status(500).json({error: 'Ocurrió un error al obtener los datos del vendedor.' })
    }
},
getUsuario: async(req,res)=>{

    const {id}=req.params
    try{
        const usuarios = await usuario.findById(id)
        res.json({usuarios})
    }catch(error){
        res.status(500).json({error: 'Ocurrió un error al obtener los datos del conductor.' })

    }
},
postUsuario: async (req, res) => {
    try {
      const {nombre,cedula,correo,contrasena,telefono,rol} = req.body;
  
      const usuarios = new usuario({nombre,cedula,correo,contrasena,telefono,rol});
  
      await usuarios.save();
      res.json({ usuarios });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarios = await usuario.findByIdAndUpdate(id, { status: 0 }, { new: true });
      res.json({ usuarios });
    } catch (error) {
      res.status(400).json({ error: 'Se produjo un error' });
    }
  },
  
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarios = await usuario.findByIdAndUpdate(id, { status: 1 }, { new: true });
      res.json({ usuarios });
    } catch (error) {
      res.status(400).json({ error: 'Se produjo un error' });
    }
  },
  deleteUsuario: async (req, res) => {
    try {
        const { id } = req.params
        const usuarios = await usuario.findByIdAndDelete(id)
  
        if(!usuarios){
          return res.status(404).json({mensaje: 'El vendedor no existe'});
        }
        res.json({mensaje: 'El vendedor ha sido eliminado'})
    } catch (error) {
        res.status(400).json({ error: 'Ocurrió un error al intentar eliminar el vendedor' })
    }
  },
   login: async (req, res) => {
          const { usuario, password } = req.body;
  
          try {
              const vendedores = await usuario.findOne({ usuario })
              if (!vendedores) {
                  return res.status(400).json({
                      msg: "vendedor / Password no son correctos"
                  })
              }
  
              if (vendedores.status == 0) {
                return res.status(400).json({
                    msg: "Vendedor inactivo"
                });
            }
            
  
              const validPassword = bcryptjs.compareSync(password, vendedores.password);
              if (!validPassword) {
                  return res.status(401).json({
                      msg: "contraseña no son correctos"
                  })
              }
  
              const token = await generarJWT(vendedores.id);
  
              res.json({
                  vendedores,
                  token
              })
  
          } catch (error) {
              return res.status(500).json({
                  msg: "Hable con el WebMaster"
              })
          }
      },


};

export default httpUsuario;
