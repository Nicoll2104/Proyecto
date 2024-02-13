import ficha from "../models/ficha.js";

const httpFicha = {
    getFicha: async (req,res)=>{
        try {
            const fichas = await ficha.find().populate('area');
            res.json(fichas);
        } catch(error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getFichaid: async (req,res)=>{
        const {id}= req.params
        try {
            const fichas = await ficha.findById(id).populate('area');
            res.json({fichas})
        } catch(error) {
            res.status(400).json({error:'No se encontró el id'})
        }
    },

    postFicha: async (req, res) => {
        try {
            const { codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area } = req.body;
            
            // Verificar si los datos enviados son válidos antes de crear un nuevo documento
            if (!codigo_ficha || !nombre || !nivel_de_formacion || !fecha_inicio || !fecha_fin || !area) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }
            
            const fichas = new ficha({ codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area });
            await fichas.save(); // Guardar el nuevo documento
            
            res.json({ mensaje: 'Ficha agregada con éxito', fichas });
        } catch (error) {
            // Capturar cualquier error y devolver una respuesta adecuada
            console.error(error); // Registrar el error en la consola para depuración
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    
    putFicha: async (req, res) => {
        const { id } = req.params;
        const { codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area } = req.body;
    
        try {
            // Verificar si el ID proporcionado es válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'ID de ficha no válido' });
            }
    
            // Verificar si los datos enviados son válidos antes de actualizar el documento
            if (!codigo_ficha || !nombre || !nivel_de_formacion || !fecha_inicio || !fecha_fin || !area) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }
    
            // Actualizar el documento con los datos proporcionados
            const fichas = await ficha.findByIdAndUpdate(id, { codigo_ficha, nombre, nivel_de_formacion, fecha_inicio, fecha_fin, area }, { new: true });
    
            if (!fichas) {
                return res.status(404).json({ mensaje: 'La ficha no existe' });
            }
    
            res.json({ mensaje: 'Ficha actualizada con éxito', fichas });
        } catch (error) {
            // Capturar cualquier error y devolver una respuesta adecuada
            console.error(error); // Registrar el error en la consola para depuración
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    

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
            const fichas = await ficha.findByIdAndUpdate(id,{status:0},{new:true}).populate('area');
            res.json({fichas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const fichas = await ficha.findByIdAndUpdate(id,{status:1},{new:true}).populate('area');
            res.json({fichas})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpFicha;
