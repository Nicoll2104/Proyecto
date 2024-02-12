import distribucion_presupuesto from "../models/distribucion_presupuesto.js";

const httpDistribucionPresupesto ={
    getDisPresupuesto: async (req, res) => {
        try {
            const distribucion = await distribucion_presupuesto.find()
            res.json({ distribucion })

        } catch (error) {
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDisPresupuestoId: async (req, res) => {
        const { id } = req.params
        try {
            const distribucion = await distribucion_presupuesto.findById(id)
            res.json({ distribucion})

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDisPresupuesto: async (req, res) => {
        try {
            const { codigo_presupuestal,nombre,presupuesto_inicial,año,lote,items } = req.body
            const distribucion = new distribucion_presupuesto({ codigo_presupuestal,nombre,presupuesto_inicial,año,lote,items })
            await distribucion.save()

            res.json({ mensaje: 'Distribucion del presupuesto agregada exitosamente', distribucion })
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' })
        }
    },

    putDisPresupuesto: async (req,res) =>{
        const {id} = req.params;
        const { codigo_presupuestal,nombre,presupuesto_inicial,año,lote,items } = req.body;

        try{
            const distribucion  = await distribucion_presupuesto.findByIdAndUpdate(id, { codigo_presupuestal,nombre,presupuesto_inicial,año,lote,items }, { new: true });

            if(!distribucion){
                return res.status(404).json({mensaje: 'La distribucion del presupuesto no existe' })
            }
            res.json({ mensaje: 'Distribucion del presupuesto actualizado con éxito', distribucion });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisPresupuesto: async(req,res)=>{
        try {
            const {id}=req.params
            const distribucion= await distribucion_presupuesto.findByIdAndRemove(id)
            res.json({distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
    
    putInactivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await distribucion_presupuesto.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
            
        }
    },
    putActivar: async (req,res)=>{
        try {
            const {id}=req.params
            const distribucion=await distribucion_presupuesto.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({distribucion})
        } catch (error) {
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}
export default httpDistribucionPresupesto;