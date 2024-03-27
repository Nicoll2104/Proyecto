import proceso from "../models/proceso.js";

const httpProceso = {
    getProceso: async (req,res)=>{
        const Procesos = await proceso.find()
        res.json(Procesos);
    },

    getProcesoId: async (req,res)=>{
        const {id}=req.params
        try{
            const Procesos = await proceso.findById(id)
            res.json({Procesos})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postProceso: async (req,res)=>{
        try{
            const {codigo, nombre}=req.body;
            const Procesos = new proceso({codigo, nombre});

            await Procesos.save();
            res.json({mensaje:'El proceso se agrego con exito', Procesos })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putProceso: async (req,res)=>{
        const {id}=req.params;
        const {codigo, nombre}=req.body;

        try{
            const Procesos = await proceso.findByIdAndUpdate(id,{codigo, nombre}, {new: true});
        
            if(!Procesos){
                return res.status(404).json({mensaje:'El proceso no existe' })
            }
            res.json({mensaje: 'Proceso actualizado con éxito',Procesos  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteProceso : async (req,res)=>{
        try{
            const {id} =req.params;
            const Procesos = await proceso.findByIdAndDelete(id);

            if(!Procesos){
                return res.status(404).json({mensaje: 'El proceso no existe' })
            }
            res.json({mensaje: 'El proceso ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar el proceso' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Procesos = await proceso.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({Procesos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Procesos = await proceso.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({Procesos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpProceso;