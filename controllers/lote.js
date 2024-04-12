import lote from "../models/lote.js";

const httpLote = {
    getLote: async (req, res) => {
        try {
            const lotes = await lote.find();
            res.json(lotes);
        } catch (error) {
            console.error("Error al obtener el lote:", error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    getLoteid: async (req, res)=>{
        const { id } = req.params;
        try{
            const lotes = await lote.findById(id)
            res.json(lotes)
        }catch(error){
            res.status(400).json({error: 'No encontramos el id'})
        }
    },

    postLote: async (req, res)=>{
        try {
            const { nombre } = req.body;
            const nuevoLote = new lote({ nombre }); // Corregido el nombre del modelo

            await nuevoLote.save();
            res.json({ mensaje: 'Lote agregado con éxito', lote: nuevoLote });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    

    putLote: async (req,res) =>{
        const { id } = req.params;
        const { nombre } = req.body;

        try{
            const lotes  = await lote.findByIdAndUpdate(id, { nombre}, { new: true });

            if(!lotes){
                return res.status(404).json({mensaje: 'El lote no existe' })
            }
            res.json({ mensaje: 'Lote actualizado con éxito', lotes });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteLote: async (req,res) =>{
        try{
            const { id } = req.params;
            const lotes = await lote.findByIdAndDelete(id);

            if(!lotes){
                return res.status(404).json({ mensaje: 'El lote no existe' });
            }
            res.json({ mensaje: 'El Lote ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el lote' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const { id } = req.params;
            const lotes = await lote.findByIdAndUpdate(id,{ status: 0 },{ new: true });
            res.json({ mensaje: 'Lote inactivado con exito', lotes });
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const { id } = req.params;
            const lotes = await lote.findByIdAndUpdate(id,{ status: 1 },{ new: true });
            res.json({ mensaje: 'Lote activado con exito', lotes });
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}

export default httpLote;
