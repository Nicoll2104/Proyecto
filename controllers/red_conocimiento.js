import red_conocimiento from "../models/red_conocimiento.js";
import Dependencias from "../models/dependencia.js";

const httpRedConocimiento = {
    getRedcon: async (req,res)=>{
        const RedConoc = await red_conocimiento.find().populate('Id_depedencias')
        res.json(RedConoc);
    },

    getRedconid: async (req,res)=>{
        const {id}=req.params
        try{
            const RedConoc = await red_conocimiento.findById(id).populate('Id_depedencias')
            res.json({RedConoc})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postRedcon: async (req,res)=>{
        try{
            const { nombre,Id_depedencias}=req.body;
            const RedConoc = new red_conocimiento({ nombre, Id_depedencias});

            await RedConoc.save();
            res.json({mensaje:'La red conocimiento se agrego con exito', RedConoc })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putRedcon: async (req,res)=>{
        const {id}=req.params;

        const { nombre,Id_depedencias}=req.body;

        try{
            const RedConoc = await red_conocimiento.findByIdAndUpdate(id,{nombre, Id_depedencias}, {new: true});

            await RedConoc.save();

            const Dep = await Dependencias.findById(Id_depedencias);

            RedConoc.Id_depedencias= Dep;   
        
            if(!RedConoc){
                return res.status(404).json({mensaje:'La red conocimiento no existe' })
            }
            res.json({mensaje: 'red conocimiento actualizado con éxito',RedConoc  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteRedcon: async (req,res)=>{
        try{
            const {id} =req.params;
            const RedConoc = await red_conocimiento.findByIdAndDelete(id);

            if(!RedConoc){
                return res.status(404).json({mensaje: 'La red conocimiento no existe' })
            }
            res.json({mensaje: 'La red conocimiento ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar la red conocimiento' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const RedConoc = await red_conocimiento.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({RedConoc})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const RedConoc = await red_conocimiento.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({RedConoc})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpRedConocimiento;