import Items_presupuesto from "../models/items_presupuesto.js";

const httpItemPresupuesto = {
    getItemPresupuesto: async (req, res) => {
        try {
            const item_Presupuesto = await Items_presupuesto.find();
            res.json(item_Presupuesto);
        } catch (error) {
            console.error("Error al obtener el presupuesto:", error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    getItemPresupuestoid: async (req, res)=>{
        const { id } = req.params;
        try{
            const item_Presupuesto = await Items_presupuesto.findById(id)
            res.json(item_Presupuesto)
        }catch(error){
            res.status(400).json({error: 'No encontramos el id'})
        }
    },

    postItemPresupuesto: async (req, res)=>{
        try {
            const { codigo_presupuestal,nombre,presupuesto_inicial,vigencia } = req.body;
            const nuevoPresupuesto = new Items_presupuesto({ codigo_presupuestal,nombre,presupuesto_inicial,vigencia }); 

            await nuevoPresupuesto.save();
            res.json({ mensaje: 'Lote agregado con éxito', Items_presupuesto: nuevoPresupuesto });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    

    putItemPresupuesto: async (req,res) =>{
        const { id } = req.params;
        const { codigo_presupuestal,nombre,presupuesto_inicial,vigencia } = req.body;

        try{
            const item_Presupuesto  = await Items_presupuesto.findByIdAndUpdate(id, { codigo_presupuestal,nombre,presupuesto_inicial,vigencia}, { new: true });

            if(!item_Presupuesto){
                return res.status(404).json({mensaje: 'El presupuesto no existe' })
            }
            res.json({ mensaje: 'Presupuesto actualizado con éxito', item_Presupuesto });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteItemPresupuesto: async (req,res) =>{
        try{
            const { id } = req.params;
            const item_Presupuesto = await Items_presupuesto.findByIdAndDelete(id);

            if(!item_Presupuesto){
                return res.status(404).json({ mensaje: 'El presupuesto no existe' });
            }
            res.json({ mensaje: 'El presupuesto ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el presupuesto' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const { id } = req.params;
            const item_Presupuesto = await Items_presupuesto.findByIdAndUpdate(id,{ status: 0 },{ new: true });
            res.json({ mensaje: 'Presupuesto inactivado con exito', item_Presupuesto });
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const { id } = req.params;
            const item_Presupuesto = await lote.findByIdAndUpdate(id,{ status: 1 },{ new: true });
            res.json({ mensaje: 'Presupuesto activado con exito', item_Presupuesto });
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}

export default httpItemPresupuesto;