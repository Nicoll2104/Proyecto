import ficha from "../models/ficha.js";
import area_tematica from '../models/area_tematica.js'

const httpFicha = {
    getFicha: async (req, res) => {
        try {
            const fichas = await ficha.find().populate('area_tematica');
            res.json(fichas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getFichaid: async (req, res) => {
        const { id } = req.params;
        try {
            const fichaEncontrada = await ficha.findById(id).populate('area_tematica');
            if (!fichaEncontrada) {
                return res.status(404).json({ error: 'No se encontró la ficha' });
            }
            res.json({ ficha: fichaEncontrada });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'No se pudo obtener la ficha' });
        }
    },

    postFicha: async (req, res) => {
        try {
            const { codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area_tematica } = req.body;
            const nuevaFicha = new ficha({ codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area_tematica });

            const areaTematicaEncontrada = await area_tematica.findById(area_tematica);

            nuevaFicha.area_tematica = areaTematicaEncontrada;
            await nuevaFicha.save(); 
            res.json({ mensaje: 'Ficha agregada con éxito', ficha: nuevaFicha });
        } catch (error) {
            console.error(error);
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
            const fichas = await ficha.findByIdAndUpdate(id,{status:0},{new:true}).populate('Area_tematica');
            res.json({fichas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const fichas = await ficha.findByIdAndUpdate(id,{status:1},{new:true}).populate('Area_tematica');
            res.json({fichas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpFicha;
