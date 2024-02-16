import distribucion_ficha from "../models/distribucion_ficha.js";
import Ficha from "../models/ficha.js";
import Distribucion_presupuesto from "../models/distribucion_presupuesto.js";;

const httpDistribucionFicha ={
    getDisFicha: async (req, res) => {
        try {
            const distribucion = await distribucion_ficha.find().populate('distribucion_presupuesto').populate('ficha');
            res.json({ distribucion })

        } catch (error) {
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDisFichaId: async (req, res) => {
        const { id } = req.params
        try {
            const distribucion = await distribucion_ficha.findById(id).populate('distribucion_presupuesto').populate('ficha');
            res.json({ distribucion})

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDisFicha: async (req, res) => {
        try {
            const { presupuesto, distribucion_presupuesto, ficha } = req.body
            const distribucion = new distribucion_ficha({ presupuesto, distribucion_presupuesto, ficha })
           
            const disPres = await Distribucion_presupuesto.findById(distribucion_presupuesto)
            const dfichas = await Ficha.findById(ficha)

            distribucion.distribucion_presupuesto = disPres
            distribucion.ficha = dfichas

            await distribucion.save()

            res.json({ mensaje: 'Distribucion de la ficha agregada exitosamente' , distribucion })
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' })
        }
    },

    putDisFicha: async (req,res) =>{
        const {id} = req.params;
        const { presupuesto, distribucion_presupuesto, ficha } = req.body;

        try{
            const distribucion  = await distribucion_ficha.findByIdAndUpdate(id, { presupuesto, distribucion_presupuesto, ficha }, { new: true });

            if(!distribucion){
                return res.status(404).json({mensaje: 'La distribucion de la ficha no existe' })
            }
            const disPres = await Distribucion_presupuesto.findById(distribucion_presupuesto)
            const dfichas = await Ficha.findById(ficha)

            distribucion.distribucion_presupuesto = disPres
            distribucion.ficha = dfichas

            res.json({ mensaje: 'Distribucion de la ficha actualizado con éxito', distribucion });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisFicha: async(req,res)=>{
        try {
            const {id}=req.params
            const distribucion= await distribucion_ficha.findByIdAndRemove(id).populate('distribucion_presupuesto').populate('ficha');
            res.json({mensaje: 'Distribucion de ficha borrado exitosamente', distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
    
    putInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await distribucion_ficha.findByIdAndUpdate(id,{status:0},{new:true}).populate('distribucion_presupuesto').populate('ficha');
            res.json({distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
            
        }
    },
    putActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await distribucion_ficha.findByIdAndUpdate(id,{status:1},{new:true}).populate('distribucion_presupuesto').populate('ficha');
            res.json({distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}
export default httpDistribucionFicha;