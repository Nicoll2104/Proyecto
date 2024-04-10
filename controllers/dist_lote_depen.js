import dist_lote_depen from "../models/dist_lote_depen.js";
import dis_Contrato_Lote from "../models/dis_contrato_lote.js";
import dis_depen from "../models/Dis_dependencia.js";

const httpDisLoteDepen = {
    getDisLoteD: async (req,res) =>{
        try{
            const distribucion = await dist_lote_depen.find().populate('disContratoLote').populate('disdepen')
            res.json({mensaje: 'Busqueda exitosa', distribucion })
        
        } catch (error){
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },

    getDisLoteDId: async (req,res)=>{
        const { id } = req.params
        try{
            const distribucion = await dist_lote_depen.findById(id).populate('disContratoLote').populate('disdepen')
            res.json({ mensaje: 'Distribucion de lote y distribucion de dependencia exitosamente' , distribucion })
        }catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDisLoteD: async (req, res) =>{
        try{
            const { presupuesto_asignado,presupuesto_actual,disContratoLote,disdepen } = req.body;
            const distribucion = new dist_lote_depen({presupuesto_asignado,presupuesto_actual,disContratoLote,disdepen});

            await distribucion.save();
            
            const rdisdepen = await dis_depen.findById(disdepen);
            const rdisContratoLote = await dis_Contrato_Lote.findById(disContratoLote);

            distribucion.disdepen = rdisdepen;
            distribucion.disContratoLote =  rdisContratoLote;

            res.json({ mensaje: 'La distribucion lote dependecia se agrego con éxito', distribucion})
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putDisLoteD: async (req,res) =>{
        const {id} = req.params;
        const { presupuesto_asignado,presupuesto_actual,disContratoLote,disdepen} = req.body;

        try{
            const distribucion = await dist_lote_depen.findByIdAndUpdate(id,{ presupuesto_asignado,presupuesto_actual,disContratoLote,disdepen}, {new: true});

            if(!distribucion){
                return res.status(404).json({mensaje: 'La distribucion lote dependencia no existe' })
            }

            await distribucion.save();
            
            const rdisdepen = await dis_depen.findById(disdepen);
            const rdisContratoLote = await dis_Contrato_Lote.findById(disContratoLote);

            distribucion.disdepen = rdisdepen;
            distribucion.disContratoLote =  rdisContratoLote;

            res.json({ mensaje: 'La distribucion lote dependencia se actualizo con éxito', distribucion})
        }catch(error){
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisLoteD: async (req,res) =>{
        try{
            const {id} = req.params;
            const distribucion =await dist_lote_depen.findByIdAndDelete(id);

            if(!distribucion){
                return res.status(404).json({ mensaje: 'La distribucion no existe' });
            }
            res.json({ mensaje: 'La distribucion ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar la distribucion' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const distribucion = await dist_lote_depen.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({distribucion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const distribucion = await dist_lote_depen.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({distribucion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}

export default httpDisLoteDepen;