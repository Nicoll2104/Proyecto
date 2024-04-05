import dis_contrato_lote from "../models/dis_contrato_lote.js";
import Lote from "../models/lote.js";
import Contrato from "../models/contrato.js";

const httpDisContratoLote ={
    getDisConL: async (req, res) => {
        try {
            const distribucion = await dis_contrato_lote.find().populate('contrato').populate('lote');
            res.json({ mensaje: 'Busqueda exitosa' , distribucion })

        } catch (error) {
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDisConLId: async (req, res) => {
        const { id } = req.params
        try {
            const distribucion = await dis_contrato_lote.findById(id).populate('lote').populate('contrato');
            res.json({ mensaje: 'Distribucion del contrato y ficha  exitosamente' , distribucion })

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDisConL: async (req, res) => {
        try {
            const {codigo_auxiliar, presupuesto_asignado, presupuesto_actual, ano, contrato, lote } = req.body;
            const distribucion = new dis_contrato_lote({codigo_auxiliar, presupuesto_asignado, presupuesto_actual, ano, contrato, lote })
            
            const rContrato = await Contrato.findById(contrato)
            const rLote = await Lote.findById(lote)

            distribucion = rLote
            distribucion = rContrato

            await distribucion.save()


            res.json({ mensaje: 'Distribucion del contrato y ficha agregada exitosamente' , distribucion })
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' })
        }
    },

    putDisConL: async (req,res) =>{
        const {id} = req.params;
        const {codigo_auxiliar, presupuesto_asignado, presupuesto_actual, ano, contrato, lote } = req.body;

        try{
            const distribucion  = await dis_contrato_lote.findByIdAndUpdate(id, {codigo_auxiliar, presupuesto_asignado, presupuesto_actual, ano, contrato, lote }, { new: true });

            if(!distribucion){
                return res.status(404).json({mensaje: 'Distribucion del contrato y ficha no existe' })
            }

            const rContrato = await Contrato.findById(contrato)
            const rLote = await Lote.findById(lote)

            distribucion = rLote
            distribucion = rContrato
            
            res.json({ mensaje: 'Distribucion del contrato y ficha actualizado con éxito', distribucion });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisConL: async(req,res)=>{
        try {
            const {id}=req.params
            const distribucion= await dis_contrato_lote.findByIdAndRemove(id)
            res.json({mensaje: 'Distribucion del contrato y ficha borrado exitosamente', distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
    
    putInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await dis_contrato_lote.findByIdAndUpdate(id,{status:0},{new:true}).populate('lote').populate('contrato');
            res.json({mensaje: 'Distribucion del contrato y ficha inactivado exitosamente', distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
            
        }
    },
    putActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await dis_contrato_lote.findByIdAndUpdate(id,{status:1},{new:true}).populate('lote').populate('contrato');
            res.json({distribucion})
        } catch (error) {
            res.json({mensaje: 'Distribucion del contrato y ficha activado exitosamente', distribucion})
        }
    }
}
export default httpDisContratoLote;