import ficha from "../models/ficha.js";

const httpFicha = {
    getFicha: async (req,res)=>{
        try {
            const fichas = await ficha.find();
            res.json(fichas);
        } catch(error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getFichaid: async (req,res)=>{
        const {id}= req.params
        try {
            const fichas = await ficha.findById(id);
            res.json({fichas})
        } catch(error) {
            res.status(400).json({error:'No se encontró el id'})
        }
    },

    postFicha: async (req, res) => {
        try {
            const { codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin} = req.body;
            const fichas = new ficha({ codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin });

            await fichas.save(); 
            res.json({ mensaje: 'Ficha agregada con éxito', fichas });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    
    
    putFicha: async (req,res) =>{
        const {id} = req.params;
        const {codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin} = req.body;
    
        try{
            const fichas  = await ficha.findByIdAndUpdate(id, { codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin}, { new: true });

            if(!fichas){
                return res.status(404).json({mensaje: 'La ficha no existe' })
            }

            res.json({ mensaje: 'Ficha actualizado con éxito', fichas });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteFicha: async (req,res) =>{
        try{
            const {id} = req.params;
            const fichas = await ficha.findByIdAndDelete(id);

            if(!fichas){
                return res.status(404).json({ mensaje: 'La ficha no existe' });
            }
            res.json({ mensaje: 'La ficha ha sido eliminada' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar la ficha' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const fichas = await ficha.findByIdAndUpdate(id,{status:0},{new:true}).populate('area_tematica');
            res.json({fichas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const fichas = await ficha.findByIdAndUpdate(id,{status:1},{new:true}).populate('area_tematica');
            res.json({fichas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpFicha;
