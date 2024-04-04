

import DistAreaDestino from "../models/dist_area_destino.js";

const httpDistareadestino = {
    getDisArDs: async (req,res)=>{
        const disAreaDest = await DistAreaDestino.find()
        res.json(disAreaDest);
    },

    getDisArDsid: async (req,res)=>{
        const {id}=req.params
        try{
            const disAreaDest = await DistAreaDestino.findById(id)
            res.json({disAreaDest})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postDisArDs: async (req,res)=>{
        try{
            const {presupuesto_asignado, presupuesto_actual, año,idDistribucionRedArea,idDestino }=req.body;
            const disAreaDest = new DistAreaDestino({presupuesto_asignado, presupuesto_actual, año,idDistribucionRedArea,idDestino});

            await disAreaDest.save();
            res.json({mensaje:'La distribucion area destino se agrego con exito', disAreaDest })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putDisArDs: async (req,res)=>{
        const {id}=req.params;
        const {presupuesto_asignado, presupuesto_actual, año,idDistribucionRedArea,idDestino}=req.body;

        try{
            const disAreaDest = await DistAreaDestino.findByIdAndUpdate(id,{presupuesto_asignado, presupuesto_actual, año,idDistribucionRedArea,idDestino}, {new: true});
        
            if(!disAreaDest){
                return res.status(404).json({mensaje:'La distribucion area destino no existe' })
            }
            res.json({mensaje: 'La distribucion area destino actualizada con éxito',disAreaDest  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteDisArDs: async (req,res)=>{
        try{
            const {id} =req.params;
            const disAreaDest = await DistAreaDestino.findByIdAndDelete(id);

            if(!disAreaDest){
                return res.status(404).json({mensaje: 'La distribucion area destino no existe' })
            }
            res.json({mensaje: 'La distribucion area destino ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar la distribucion area destino' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const disAreaDest = await DistAreaDestino.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({disAreaDest})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const disAreaDest = await DistAreaDestino.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({disAreaDest})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpDistareadestino;