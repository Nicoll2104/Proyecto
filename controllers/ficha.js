import ficha from "../models/ficha.js";
import area_tematica from '../models/area_tematica.js'

const httpFicha = {
    getFicha: async (req,res)=>{
        try {
            const fichas = await ficha.find().populate('area_tematica');
            res.json(fichas);
        } catch(error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getFichaid: async (req,res)=>{
        const {id}= req.params
        try {
            const fichas = await ficha.findById(id).populate('area_tematica');
            res.json({fichas})
        } catch(error) {
            res.status(400).json({error:'No se encontró el id'})
        }
    },

    postFicha: async (req, res) => {
        try {
            const { codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area_tematica } = req.body;
            const fichas = new ficha({ codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area_tematica });

            const rArea_tematica = await area_tematica.findById(area_tematica)

            fichas.area = rArea_tematica
            await fichas.save(); 
            res.json({ mensaje: 'Ficha agregada con éxito', fichas });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    
    
    putFicha: async (req,res) =>{
        const {id} = req.params;
        const {codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area_tematica} = req.body;
    
        try{
            const fichas  = await ficha.findByIdAndUpdate(id, { codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area_tematica}, { new: true });

            if(!fichas){
                return res.status(404).json({mensaje: 'La ficha no existe' })
            }

            const rArea_tematica = await area_tematica.findById(area_tematica)

            fichas.area = rArea_tematica
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
