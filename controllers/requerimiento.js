import requerimiento from "../models/requerimiento.js";

const httprequerimiento = {
    getRequerimiento: async (req,res)=>{
        const requerimientos = await requerimiento.find()
        res.json(requerimientos);
    },

    getRequerimientoid: async (req,res)=>{
        const {id}=req.params
        try{
            const requerimientos = await requerimiento.findById(id)
            res.json({requerimientos})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postRequerimiento: async (req,res)=>{
        try{
            const {fecha, id_distribucion_ficha, id_usuario}=req.body;
            const requerimientos = new requerimiento({fecha, id_distribucion_ficha, id_usuario});

            await requerimientos.save();
            res.json({mensaje:'El Requerimiento se agrego con exito', requerimientos })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putRequerimiento: async (req,res)=>{
        const {id}=req.params;
        const {fecha, id_distribucion_ficha, id_usuario}=req.body;

        try{
            const requerimientos = await requerimiento.findByIdAndUpdate(id,{fecha, id_distribucion_ficha, id_usuario}, {new: true});
        
            if(!requerimientos){
                return res.status(404).json({mensaje:'El requerimiento no existe' })
            }
            res.json({mensaje: 'Requerimiento actualizado con éxito',requerimientos  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteRequerimiento: async (req,res)=>{
        try{
            const {id} =req.params;
            const requerimientos = await requerimiento.findByIdAndDelete(id);

            if(!requerimientos){
                return res.status(404).json({mensaje: 'El requerimiento no existe' })
            }
            res.json({mensaje: 'El requerimiento ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar al requerimiento' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const requerimientos = await requerimiento.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({requerimientos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const requerimientos = await requerimiento.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({requerimientos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httprequerimiento;