import distribucion_red from "../models/distribucion_red.js";

const httpDisRed = {
    getDistriRed: async (req,res)=>{
        const DistRed = await distribucion_red.find()
        res.json(DistRed);
    },

    getDistriRedid: async (req,res)=>{
        const {id}=req.params
        try{
            const DistRed = await distribucion_red.findById(id)
            res.json({DistRed})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postDistriRed: async (req,res)=>{
        try{
            const {codigo_presupuesto, nombre, presupuesto_inicial, año}=req.body;
            const DistRed = new distribucion_red({codigo_presupuesto, nombre, presupuesto_inicial, año});

            await DistRed.save();
            res.json({mensaje:'La distribucion de red se agrego con exito', DistRed })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putDistriRed: async (req,res)=>{
        const {id}=req.params;
        const {codigo_presupuesto, nombre, presupuesto_inicial, año}=req.body;

        try{
            const DistRed = await distribucion_red.findByIdAndUpdate(id,{codigo_presupuesto, nombre, presupuesto_inicial, año}, {new: true});
        
            if(!DistRed){
                return res.status(404).json({mensaje:'La distribucion red no existe' })
            }
            res.json({mensaje: 'Distribucion red actualizado con éxito',DistRed  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteDistriRed: async (req,res)=>{
        try{
            const {id} =req.params;
            const DistRed = await distribucion_red.findByIdAndDelete(id);

            if(!DistRed){
                return res.status(404).json({mensaje: 'El distribucion_red no existe' })
            }
            res.json({mensaje: 'La distribucion red ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar la distribucion red' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const DistRed = await distribucion_red.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({DistRed})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const DistRed = await distribucion_red.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({DistRed})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpDisRed;