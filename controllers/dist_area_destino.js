import dist_area_destino from "../models/dist_area_destino.js";

const httpDistareadestino = {
    getDistAreaDestino: async (req, res) => {
        const distAreaDestino = await dist_area_destino.find()
        res.json(distAreaDestino);
    },
    

    getDistAreaDestinoid: async (req,res)=>{
        const {id}=req.params
        try{
            const distAreaDestino = await dist_area_destino.findById(id)
            res.json({distAreaDestino})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postDistAreaDestino: async (req,res)=>{
        try{
            const {presupuesto_asignado,presupuesto_actual,año,idDistribucionRedArea,idDestino}=req.body;
            const distAreaDestino = new dist_area_destino({presupuesto_asignado,presupuesto_actual,año,idDistribucionRedArea,idDestino});

            await distAreaDestino.save();
            res.json({mensaje:'La distribucion area destino se agrego con exito', distAreaDestino })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putDistAreaDestino: async (req,res)=>{
        const {id}=req.params;
        const {presupuesto_asignado,presupuesto_actual,año,idDistribucionRedArea,idDestino}=req.body;

        try{
            const distAreaDestino = await dist_area_destino.findByIdAndUpdate(id,{presupuesto_asignado,presupuesto_actual,año,idDistribucionRedArea,idDestino}, {new: true});
        
            if(!distAreaDestino){
                return res.status(404).json({mensaje:'La distribucion area destino no existe' })
            }
            res.json({mensaje: 'La distribucion area destino fue actualizada con éxito',distAreaDestino  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteDistAreaDestino: async (req,res)=>{
        try{
            const {id} =req.params;
            const distAreaDestino = await dist_area_destino.findByIdAndDelete(id);

            if(!distAreaDestino){
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
            const distAreaDestino = await dist_area_destino.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({distAreaDestino})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const distAreaDestino = await dist_area_destino.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({distAreaDestino})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpDistareadestino;