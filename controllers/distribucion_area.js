import distribucion_area from "../models/distribucion_area.js";

const httpDistribucionArea = {
    getDistarea: async (req,res)=>{
        const DisArea = await distribucion_area.find()
        res.json(DisArea);
    },

    getDistareaid: async (req,res)=>{
        const {id}=req.params
        try{
            const DisArea = await distribucion_area.findById(id)
            res.json({DisArea})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postDistarea: async (req,res)=>{
        try{
            const {codigo_auxiliar, valor_presupuesto, distribucion_red, area_tematica}=req.body;
            const DisArea = new distribucion_area({codigo_auxiliar, valor_presupuesto, distribucion_red, area_tematica});

            await DisArea.save();
            res.json({mensaje:'La distribucion del area se agrego con exito', DisArea })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putDistarea: async (req,res)=>{
        const {id}=req.params;
        const {codigo_auxiliar, valor_presupuesto, distribucion_red, area_tematica}=req.body;

        try{
            const DisArea = await distribucion_area.findByIdAndUpdate(id,{codigo_auxiliar, valor_presupuesto, distribucion_red, area_tematica}, {new: true});
        
            if(!DisArea){
                return res.status(404).json({mensaje:'La dsitribucion de area no existe' })
            }
            res.json({mensaje: 'La distribucion del area fue actualizada con éxito',DisArea  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteDistarea: async (req,res)=>{
        try{
            const {id} =req.params;
            const DisArea = await distribucion_area.findByIdAndDelete(id);

            if(!DisArea){
                return res.status(404).json({mensaje: 'La dsitribucion de area no existe' })
            }
            res.json({mensaje: 'La distribucion del area ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar al Distareas_presupuesto' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const DisArea = await distribucion_area.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({DisArea})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const DisArea = await distribucion_area.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({DisArea})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpDistribucionArea;