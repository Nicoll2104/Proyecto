import dependencia from "../models/dependencia.js";
/*prueba */
const httpDependencia = {
    getDependencia: async (req,res)=>{
        const dep = await dependencia.find()
        res.json(dep);
    },

    getDependenciaid: async (req,res)=>{
        const {id}=req.params
        try{
            const dep = await dependencia.findById(id)
            res.json({dep})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postDependencia: async (req,res)=>{
        try{
            const {codigo, nombre}=req.body;
            const dep = new dependencia({codigo, nombre});

            await dep.save();
            res.json({mensaje:'La dependencia se agrego con exito', dep })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putDependencia: async (req,res)=>{
        const {id}=req.params;
        const {codigo, nombre}=req.body;

        try{
            const dep = await dependencia.findByIdAndUpdate(id,{codigo, nombre}, {new: true});
        
            if(!dep){
                return res.status(404).json({mensaje:'La dependencia no existe' })
            }
            res.json({mensaje: 'Dependencia actualizado con éxito',dep  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteDependencia: async (req,res)=>{
        try{
            const {id} =req.params;
            const dep = await dependencia.findByIdAndDelete(id);

            if(!dep){
                return res.status(404).json({mensaje: 'El dependencia no existe' })
            }
            res.json({mensaje: 'El dependencia ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar la dependencia' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const dep = await dependencia.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({dep})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const dep = await dependencia.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({dep})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpDependencia;

