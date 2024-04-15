import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer'
import usuario from "../models/usuario.js";
import { generarJWT, validarJWT } from "../middlewares/validar.js";

let codigoEnviado = {};

function generarNumeroAleatorio() {
  let numeroAleatorio = Math.floor(Math.random() * 1000000);
  let numero = numeroAleatorio.toString().padStart(6, "0");
  let fechaCreacion = new Date();

  codigoEnviado = { codigo: numero, fechaCreacion };

  return numero;
}


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
            res.json({mensaje: 'Cliente agregado con éxito', usuarios})
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


codigoRecuperar: async (req, res) => {
    try {
      const { correo } = req.params;

      const codigo = generarNumeroAleatorio();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });

      const mailOptions = {
        from: process.env.userEmail,
        to: correo,
        subject: "Recuperación de Contraseña",
        text: "Tu código para restablecer tu contraseña es: " + codigo,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error: "Error al enviar el correo electrónico.",
          });
        } else {
          console.log("Correo electrónico enviado: " + info.response);
          res.json({
            success: true,
            msg: "Correo electrónico enviado con éxito.",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  confirmarCodigo: async (req, res) => {
    try {
      const { codigo } = req.params;

      if (!codigoEnviado) {
        return res.status(400).json({ error: "Código no generado" });
      }

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo == codigoGuardado) {
        return res.json({ msg: "Código correcto" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
    }
  },



nuevaPassword: async (req, res) => {
    try {
      const { correo, codigo, contrasena } = req.body;

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo == codigoGuardado) {
        codigoEnviado = {};

        const usuarioa = await usuario.findOne({correo})

        const salt = bcryptjs.genSaltSync();
        const newcontrasena = bcryptjs.hashSync(contrasena, salt);

        await usuario.findByIdAndUpdate(
          usuarioa.id,
          { contrasena: newcontrasena },
          { new: true }
        );

        return res
          .status(200)
          .json({ msg: "Contraseña actualizada con éxito" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
    }
  },
    
}

export default httpUsuario;