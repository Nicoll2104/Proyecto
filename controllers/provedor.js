import Provedor from "../models/provedor.js";

const httpProvedor = {
    getProvedor: async (req,res)=>{
        const provedores = await Provedor.find()
        res.json(provedores);
    },

    getProvedorId: async (req,res)=>{
        const {id}=req.params
        try{
            const provedores = await Provedor.findById(id)
            res.json({provedores})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postProvedor: async (req,res)=>{
        try{
            const {nombre,dni,correo,telefono}=req.body;
            const provedores = new Provedor({nombre,dni,correo,telefono})
        
            await provedores.save();
            res.json({mensaje:'Los provedores se han agrego con exito', provedores})
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putProvedor: async (req,res)=>{
        const {id}=req.params;
        const {nombre,dni,correo,telefono}=req.body;

        try{
            const provedores = await Provedor.findByIdAndUpdate(id,{nombre,dni,correo,telefono}, {new: true})
        
            if(!provedores){
                return res.status(404),json({mensaje: 'El provedor no existe'})
            }
            res.json({mensaje: 'Provedor actualizado con éxito',provedores})
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteProvedor: async (req,res)=>{
        try{
            const {id}=req.params;
            const provedores = await Provedor.findByIdAndDelete(id);

            if(!provedores){
                return res.status(404).json({mensaje: 'El provedor no existe' })
            }
            res.json({mensaje: 'El provedor ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar al provedor' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const provedores = await Provedor.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({provedores})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const provedores = await Provedor.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({provedores})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpProvedor