import area_tematica from "../models/area_tematica.js";

const httpArea_tematica = {
    getAreaTematica: async (req,res)=>{
        const A_tematica = await area_tematica.find()
        res.json(A_tematica);
    },

    getAreaTematicaid: async (req,res)=>{
        const {id}=req.params
        try{
            const A_tematica = await area_tematica.findById(id)
            res.json({A_tematica})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postAreaTematica: async (req,res)=>{
        try{
            const {codigo, nombre, id_red_conocimiento}=req.body;
            const A_tematica = new area_tematica({codigo, nombre, id_red_conocimiento});

            await A_tematica.save();
            res.json({mensaje:'El Area tematica se agrego con exito', A_tematica })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putAreaTematica: async (req,res)=>{
        const {id}=req.params;
        const {codigo, nombre, id_red_conocimiento}=req.body;

        try{
            const A_tematica = await area_tematica.findByIdAndUpdate(id,{codigo, nombre, id_red_conocimiento}, {new: true});
        
            if(!A_tematica){
                return res.status(404).json({mensaje:'El area tematica no existe' })
            }
            res.json({mensaje: 'area tematica actualizado con éxito',A_tematica  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteAreaTematica: async (req,res)=>{
        try{
            const {id} =req.params;
            const A_tematica = await area_tematica.findByIdAndDelete(id);

            if(!A_tematica){
                return res.status(404).json({mensaje: 'El area tematica no existe' })
            }
            res.json({mensaje: 'El area tematica ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar al area_tematica' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const A_tematica = await area_tematica.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({A_tematica})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const A_tematica = await area_tematica.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({A_tematica})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpArea_tematica;