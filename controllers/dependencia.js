import dependencia from "../models/dependencia.js";

const httpDependencia = {
    getDepe: async (req, res) => {
        try {
            const dependencias = await dependencia.find();
            res.json(dependencias);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getDepeid: async (req, res)=>{
        const{id}= req.params
        try{
            const dependecias = await dependencia.findById(id)
            res.json({ dependecias})
        }catch(error){
            res.status(400).json({error:'No encontramos el id'})
        }
    },

    postDepe: async (req, res)=>{
        try {
            const { codigo, nombre, año } = req.body;
            const nuevaDependencia = new dependencia({ codigo, nombre, año }); // Cambia el nombre de la variable
    
            await nuevaDependencia.save();
            res.json({ mensaje: 'Dependencia agregada con éxito', dependencia: nuevaDependencia }); // Usa la nueva variable
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    

    putDepe: async (req,res) =>{
        const {id} = req.params;
        const {codigo,nombre,año} = req.body;

        try{
            const dependecias  = await dependencia.findByIdAndUpdate(id, {codigo,nombre,año }, { new: true });

            if(!dependecias){
                return res.status(404).json({mensaje: 'El dependencia no existe' })
            }
            res.json({ mensaje: 'Dependencia actualizado con éxito', dependecias });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteDepe: async (req,res) =>{
        try{
            const {id} = req.params;
            const dependecias = await dependencia.findByIdAndDelete(id);

            if(!dependecias){
                return res.status(404).json({ mensaje: 'El dependencia no existe' });
            }
            res.json({ mensaje: 'El dependencia ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar el usuario' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const dependencias = await dependencia.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({mensaje: 'Lote inactivado con exito', dependencias})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const dependencias = await dependencia.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({mensaje: 'Lote activado con exito', dependencias})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}

export default httpDependencia;