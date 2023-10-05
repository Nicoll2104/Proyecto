
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
}