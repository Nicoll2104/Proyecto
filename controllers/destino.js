import destino from "../models/destino.js";

const httpDestino = {
    getDestino: async (req, res) => {
        try {
            const destinos = await destino.find();
            res.json(destinos);
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getDestinoid: async (req,res)=>{
        const {id}= req.params
        try {
            const destinos = await destino.findById(id);
            res.json({destinos})
        } catch(error) {
            res.status(400).json({error:'No se encontró el id'})
        }
    },

    postDestino: async (req, res) => {
        try {
            const { codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin} = req.body;
            const destinos = new destino({ codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin });

            await destinos.save(); 
            res.json({ mensaje: 'Destino agregado con éxito', destinos });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    
    
    putDestino: async (req,res) =>{
        const {id} = req.params;
        const {codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin} = req.body;
    
        try{
            const destinos  = await destino.findByIdAndUpdate(id, { codigo, nombre, nivel_de_formacion, fecha_inicio, fecha_fin}, { new: true });

            if(!destinos){
                return res.status(404).json({mensaje: 'El destino no existe' })
            }

            res.json({ mensaje: 'Destino actualizado con éxito', destinos });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDestino: async (req,res) =>{
        try{
            const {id} = req.params;
            const destinos = await destino.findByIdAndDelete(id);

            if(!destinos){
                return res.status(404).json({ mensaje: 'El destino no existe' });
            }
            res.json({ mensaje: 'El destino ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el destino' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const destinos = await destino.findByIdAndUpdate(id,{status:0},{new:true});
            res.json({destinos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const destinos = await destinos.findByIdAndUpdate(id,{status:1},{new:true});
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpDestino;
