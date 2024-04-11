import dis_red_area from "../models/dis_red_area.js";
import dis_depen_red from "../models/dis_depen_red.js";
import area_tematica from "../models/area_tematica.js";

const httpDisRedArea = {
    getDisRedA: async (req,res) =>{
        try{
            const distribucion = await dis_red_area.find().populate('disRed').populate('area')
            res.json({mensaje: 'Busqueda exitosa', distribucion })
        
        }catch (error){
            res.status(400).json({ error:'Error interno del servidor' })
        }
    },
    getDisRedAId: async (req,res) =>{
        const { id } = req.params
        try{
            const distribucion = await dis_red_area.findById(id).populate('disRed').populate('area')
            res.json({ mensaje: 'Distribucion red area exitosamente' , distribucion })
        }catch (error) {
            res.status(400).json({ error: 'Error interno del servidor'  })
        }
    },

    postDisRedA: async (req,res) =>{
        try{
            const { presupuesto_asignado, presupuesto_actual, ano, disRed, area } = req.body;
            const distribucion = new dis_red_area({presupuesto_asignado, presupuesto_actual, ano, disRed, area});

            await distribucion.save();

            const rdisRed = await dis_depen_red.findById(disRed);
            const rarea = await area_tematica.findById(area);

            distribucion.disRed = rdisRed
            distribucion.area = rarea

            res.json({ mensaje: 'La distribucion red area se agrego con éxito', distribucion})
        }catch (error){
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putDisRedA: async (req,res) =>{
        const {id} = req.params;
        const { presupuesto_asignado, presupuesto_actual, ano, disRed, area } = req.body;

        try{
            const distribucion = await dis_red_area.findByIdAndUpdate(id,{presupuesto_asignado, presupuesto_actual, ano, disRed, area }, {new: true});

            if(!distribucion){
                return res.status(404).json({mensaje: 'La distribucion red area no existe' })
            }

            await distribucion.save();

            const rdisRed = await dis_depen_red.findById(disRed);
            const rarea = await area_tematica.findById(area);

            distribucion.disRed = rdisRed
            distribucion.area = rarea

            res.json({ mensaje: 'La distribucion red area se agrego con éxito', distribucion})
        }catch(error){
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDisRedA: async (req,res) =>{
        try{
            const {id} = req.params;
            const distribucion =await dis_red_area.findByIdAndDelete(id);

            if(!distribucion){
                return res.status(404).json({ mensaje: 'La distribucion no existe' });
            }
            res.json({ mensaje: 'La distribucion ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar la distribucion' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const distribucion = await dis_red_area.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({distribucion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const distribucion = await dis_red_area.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({distribucion})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
}

export default httpDisRedArea;