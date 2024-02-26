import distribucion_ficha from "../models/distribucion_ficha.js";

const httpDistribucionFicha ={
    getDisFicha: async (req, res) => {
        try {
            const distribucion = await distribucion_ficha.find()
            res.json({ distribucion })

        } catch (error) {
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDisFichaId: async (req, res) => {
        const { id } = req.params
        try {
            const distribucion = await distribucion_ficha.findById(id)
            res.json({ distribucion})

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDisFicha: async (req, res) => {
        try {
            const {codigo_auxiliar, presupuesto, distribucion_presupuesto, ficha } = req.body
            const distribucion = new distribucion_ficha({codigo_auxiliar, presupuesto, distribucion_presupuesto, ficha })
            await distribucion.save()

            res.json({ mensaje: 'Distribucion de la ficha agregada exitosamente' , distribucion })
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' })
        }
    },

    putDisFicha: async (req,res) =>{
        const {id} = req.params;
        const {codigo_auxiliar, presupuesto, distribucion_presupuesto, ficha } = req.body;

        try{
            const distribucion  = await distribucion_ficha.findByIdAndUpdate(id, {codigo_auxiliar, presupuesto, distribucion_presupuesto, ficha }, { new: true });

            if(!distribucion){
                return res.status(404).json({mensaje: 'La distribucion de la ficha no existe' })
            }
            res.json({ mensaje: 'Distribucion de la ficha actualizado con éxito', distribucion });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisFicha: async(req,res)=>{
        try {
            const {id}=req.params
            const distribucion= await distribucion_ficha.findByIdAndRemove(id)
            res.json({mensaje: 'Distribucion de ficha borrado exitosamente', distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
    
    putInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await distribucion_ficha.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
            
        }
    },
    putActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await distribucion_ficha.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}
export default httpDistribucionFicha;