import conexion_lote_red from "../models/conexion_lote_red.js";

const httpConLoteRed = {
    getConLoteRed: async (req,res)=>{
        const conexion = await conexion_lote_red.find()
        res.json(conexion);
    },

    getConLoteRedid: async (req,res)=>{
        const {id}=req.params
        try{
            const conexion = await conexion_lote_red.findById(id)
            res.json({conexion})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postConLoteRed: async (req,res)=>{
        try{
            const {codigo_auxiliar, valor_presupuesto,id_distribucion_dependencia ,id_red_conocimiento,id_tipo_producto }=req.body;
            const conexion = new conexion_lote_red({codigo_auxiliar, valor_presupuesto,id_distribucion_dependencia ,id_red_conocimiento,id_tipo_producto});

            await conexion.save();
            res.json({mensaje:'La conexion lote red se agrego con exito', conexion })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putConLoteRed: async (req,res)=>{
        const {id}=req.params;
        const {codigo_auxiliar, valor_presupuesto,id_distribucion_dependencia ,id_red_conocimiento,id_tipo_producto}=req.body;

        try{
            const conexion = await conexion_lote_red.findByIdAndUpdate(id,{codigo_auxiliar, valor_presupuesto,id_distribucion_dependencia ,id_red_conocimiento,id_tipo_producto}, {new: true});
        
            if(!conexion){
                return res.status(404).json({mensaje:'La conexion lote red no existe' })
            }
            res.json({mensaje: 'Conexion lote red actualizado con éxito',conexion  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteConLoteRed: async (req,res)=>{
        try{
            const {id} =req.params;
            const conexion = await conexion_lote_red.findByIdAndDelete(id);

            if(!conexion){
                return res.status(404).json({mensaje: 'El conexion lote red no existe' })
            }
            res.json({mensaje: 'La distribucion red ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar la distribucion red' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const conexion = await conexion_lote_red.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({conexion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const conexion = await conexion_lote_red.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({conexion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpConLoteRed;