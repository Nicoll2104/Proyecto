import Dis_dependencias from "../models/dis_dependencias.js";
import Item_presupuesto from "../models/items_presupuesto.js";
import Dependencias from "../models/dependencia.js"

const httpDisDependencias = {
    getDis_dependencias: async (req, res) => {
        try {
            const D_Dependencias = await Dis_dependencias.find().populate('id_item_presupuesto').populate('id_dependencias'); 
            res.json(D_Dependencias);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getDis_dependenciasId: async (req, res) => {
        const { id } = req.params;
        try {
            const D_Dependencias = await Dis_dependencias.findById(id).populate('id_item_presupuesto'); 
            if (!D_Dependencias) {
                return res.status(404).json({ mensaje: 'La distribucion de la dependencia no existe' });
            }
            res.json({ D_Dependencias });
        } catch (error) {
            res.status(400).json({ error: 'No se encontró el ID de la distribucion de la dependencia' });
        }
    },

    postDis_dependencias: async (req, res) => {
        try {
            const { codigo_auxiliar, valor_presupuesto, id_item_presupuesto, id_dependencias } = req.body;
            const D_Dependencias = new Dis_dependencias({ codigo_auxiliar, valor_presupuesto, id_item_presupuesto, id_dependencias }); 

            await D_Dependencias.save();
            const It_presupuesto = await Item_presupuesto.findById(id_item_presupuesto); 
            const Dependencia = await Dependencias.findById(id_dependencias);

            D_Dependencias.id_item_presupuesto = It_presupuesto;
            D_Dependencias.id_dependencias = Dependencia;
            res.json({ mensaje: 'La distribucion de la dependencia se agregó con éxito', D_Dependencias });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putDis_dependencias: async (req,res) =>{
        const {id} = req.params;
        const {codigo_auxiliar, valor_presupuesto, id_item_presupuesto, id_dependencias} = req.body;
    
        try{
            const D_Dependencias  =await Dis_dependencias.findByIdAndUpdate(id, { codigo_auxiliar, valor_presupuesto, id_item_presupuesto, id_dependencias}, { new: true });

            if(!D_Dependencias){
                return res.status(404).json({mensaje: 'La distribucion de la dependencia no existe' })
            }

            await D_Dependencias.save();
            const It_presupuesto = await Item_presupuesto.findById(id_item_presupuesto); 
            const Dependencia = await Dependencias.findById(id_dependencias);

            D_Dependencias.id_item_presupuesto = It_presupuesto;
            D_Dependencias.id_dependencias = Dependencia;
            res.json({ mensaje: 'La distribucion de la dependencia fue actualizado con éxito', D_Dependencias });
        }catch(error){
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDis_dependencias: async (req,res) =>{
        try{
            const {id} = req.params;
            const D_Dependencias = await Dis_dependencias.findByIdAndDelete(id);

            if(!D_Dependencias){
                return res.status(404).json({ mensaje: 'La distribucion de la dependencia no existe' });
            }
            res.json({ mensaje: 'La distribucion de la dependencia ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar la distribucion de la dependencia' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const D_Dependencias = await Dis_dependencias.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({D_Dependencias})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const D_Dependencias = await Dis_dependencias.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({D_Dependencias})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
    
} 

export default httpDisDependencias;