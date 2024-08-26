import item_presupuesto from "../models/items_presupuesto.js";

const httpItemPresupuesto = {
    getPresupuesto: async (req, res) => {
        try {
            const Presupuesto = await item_presupuesto.find();
            res.json(Presupuesto);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getPresupuestoId: async (req, res) => {
        const { id } = req.params;
        try {
            const Presupuesto = await item_presupuesto.findById(id)
            if (!Presupuesto) {
                return res.status(404).json({ mensaje: 'El presupuesto no existe' });
            }
            res.json({ Presupuesto });
        } catch (error) {
            res.status(400).json({ error: 'No se encontró el ID del presupuesto' });
        }
    },

    postPresupuesto: async (req, res) => {
        try {
            const {codigo_presupuestal,nombre,presupuesto_inicial,vigencia } = req.body;
            const Presupuesto = new item_presupuesto({codigo_presupuestal,nombre,presupuesto_inicial,vigencia}); 

            res.json({ mensaje: 'El presupuesto se agregó con éxito', Presupuesto });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putPresupuesto: async (req,res) =>{
        const {id} = req.params;
        const {codigo_presupuestal,nombre,presupuesto_inicial,vigencia} = req.body;
    
        try{
            const Presupuesto =await item_presupuesto.findByIdAndUpdate(id, { codigo_presupuestal,nombre,presupuesto_inicial,vigencia}, { new: true });

            if(!Presupuesto){
                return res.status(404).json({mensaje: 'El presupuesto no existe' })
            }
            res.json({ mensaje: 'Presupuesto actualizado con éxito', Presupuesto });
        }catch(error){
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deletePresupuesto: async (req,res) =>{
        try{
            const {id} = req.params;
            const Presupuesto = await item_presupuesto.findByIdAndDelete(id);

            if(!Presupuesto){
                return res.status(404).json({ mensaje: 'El presupuesto no existe' });
            }
            res.json({ mensaje: 'El presupuesto ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el presupuesto' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Presupuesto = await item_presupuesto.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({Presupuesto})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Presupuesto = await item_presupuesto.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({Presupuesto})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
    
} 

export default httpItemPresupuesto;