import area from "../models/area.js";

const httpArea ={
    getArea: async (req, res) => {
        try {
            const areas = await area.find().populate('ficha_id');
            res.json({ areas });

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },
    getAreaId: async (req, res) => {
        const { id } = req.params;
        try {
            const areas = await area.findById(id).populate('ficha_id');
            res.json({ areas });

        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    postArea: async (req, res) => {
        try {
            const { nombre, presupuesto, ficha_id } = req.body;
            const areas = new area({ nombre, presupuesto, ficha_id });
            await areas.save();

            res.json({ mensaje: 'Area agregada exitosamente' });
        } catch (error) {
            res.status(400).json({ error: 'Error interno del servidor' });
        }
    },

    putArea: async (req,res) =>{
        const { id } = req.params;
        const { nombre, presupuesto, ficha_id } = req.body;

        try{
            const areas  = await area.findByIdAndUpdate(id, { nombre, presupuesto, ficha_id }, { new: true }).populate('ficha_id');

            if(!areas){
                return res.status(404).json({ mensaje: 'El area no existe' });
            }
            res.json({ mensaje: 'Area actualizado con éxito', areas });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteArea: async(req,res)=>{
        try {
            const { id } = req.params;
            const areas = await area.findByIdAndRemove(id);
            res.json({ areas });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });
        }
    },
    
    putInactivar: async (req,res)=>{
        try {
            const { id } = req.params;
            const areas = await area.findByIdAndUpdate(id, { status: 0 }, { new: true }).populate('ficha_id');
            res.json({ areas });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });   
        }
    },
    putActivar: async (req,res)=>{
        try {
            const { id } = req.params;
            const areas = await area.findByIdAndUpdate(id, { status: 1 }, { new: true }).populate('ficha_id');
            res.json({ areas });
        } catch (error) {
            res.status(400).json({ error: 'Se produjo un error' });
        }
    }
}
export default httpArea;
