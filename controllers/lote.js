
import lote from "../models/lote.js";


const httpLote = {
    getLote: async  ( req , res )=>{
        const lotes = await lote.find()
        res.json(lotes);
    },

    getLotesid: async (req, res)=>{
        const{id}= req.params
        try{
            const lotes = await lote.findById(id)
            res.json({lotes})
        }catch(error){
            res.status(400).json({error:'No encontramos el id'})
        }
    },

    postLotes: async (req , res )=>{
        try{
            const {codigo_presupuestal,nombre,presupuesto_inicial,año,modificaciones,presupuesto_definitivo}=req.body;
            const lotes = new lote({codigo_presupuestal,nombre,presupuesto_inicial,año,modificaciones,presupuesto_definitivo});

            await lotes.save();
            res.json({mensaje:'Lote agregado con exito'})
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putLote: async (req,res) =>{
        const {id} = req.params;
        const {codigo_presupuestal,nombre,presupuesto_inicial,año,modificaciones,presupuesto_definitivo} = req.body;

        try{
            const lotes  = await lote.findByIdAndUpdate(id, {codigo_presupuestal,nombre,presupuesto_inicial,año,modificaciones,presupuesto_definitivo }, { new: true });

            if(!lotes){
                return res.status(404).json({mensaje: 'El lote no existe' })
            }
            res.json({ mensaje: 'Lote actualizado con éxito', lotes });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteLote: async (req,res) =>{
        try{
            const {id} = req.params;
            const lotes = await lote.findByIdAndDelete(id);

            if(!lotes){
                return res.status(404).json({ mensaje: 'El lote no existe' });
            }
            res.json({ mensaje: 'El lote ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el usuario' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const lotes = await lote.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({lotes})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const lotes = await lote.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({lotes})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}

export default httpLote;