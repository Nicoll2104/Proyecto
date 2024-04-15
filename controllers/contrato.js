import Contrato from "../models/contrato.js";
import Usuario from "../models/usuario.js";
import Proveedor from "../models/provedor.js";
import Proceso from "../models/proceso.js";

const httpContrato = {
    getcontrato: async (req,res)=>{
        const contratos = await Contrato.find()
        res.json(contratos);
    },

    getcontratoid: async (req,res)=>{
        const {id}=req.params
        try{
            const contratos = await Contrato.findById(id)
            res.json({contratos})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postcontrato: async (req,res)=>{
        try{
            const {codigo,nombre,presupuestoAsignado,presupuestoActual}=req.body;
            const contratos = new Contrato({codigo,nombre,presupuestoAsignado,presupuestoActual});

            await contratos.save();
            res.json({mensaje:'El contrato se agrego con exito', contratos })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putcontrato: async (req,res)=>{
        const {id}=req.params;
        const {codigo,nombre,presupuestoAsignado,presupuestoActual}=req.body;

        try{
            const contratos = await Contrato.findByIdAndUpdate(id,{codigo,nombre,presupuestoAsignado,presupuestoActual}, {new: true});
        
            if(!contratos){
                return res.status(404).json({mensaje:'El contrato no existe' })
            }
            res.json({mensaje: 'Contrato actualizado con éxito',contratos  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deletecontrato: async (req,res)=>{
        try{
            const {id} =req.params;
            const contratos = await Contrato.findByIdAndDelete(id);

            if(!contratos){
                return res.status(404).json({mensaje: 'El contrato no existe' })
            }
            res.json({mensaje: 'El contrato ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar al contrato' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const contratos = await Contrato.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({contratos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const contratos = await Contrato.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({contratos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpContrato;