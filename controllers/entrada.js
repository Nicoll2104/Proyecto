import entrada from "../models/entrada.js";

const httpEntrada = {
    getEntrada: async (req,res)=>{
        const entrd = await entrada.find().populate('idProducto')
        res.json(entrd);
    },

    getEntradaId: async (req,res)=>{
        const {id}=req.params
        try{
            const entrd = await entrada.findById(id).populate('idProducto')
            res.json({entrd})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postEntrada: async (req,res)=>{
        try{
            const {cantidad,total,idProducto}=req.body;
            const entrd = new entrada({cantidad,total,idProducto});

            await entrd.save();
            res.json({mensaje:'La entrada se agrego con exito', entrd })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putEntrada: async (req,res)=>{
        const {id}=req.params;
        const {cantidad,total,idProducto}=req.body;

        try{
            const entrd = await entrada.findByIdAndUpdate(id,{cantidad,total,idProducto}, {new: true});
        
            if(!entrd){
                return res.status(404).json({mensaje:'La entrada no existe' })
            }
            res.json({mensaje: 'Entrada actualizada con éxito',entrd  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteEntrada : async (req,res)=>{
        try{
            const {id} =req.params;
            const entrd = await entrada.findByIdAndDelete(id);

            if(!entrd){
                return res.status(404).json({mensaje: 'La entrada no existe' })
            }
            res.json({mensaje: 'La entrada ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar el Entrada' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const entrd = await entrada.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({entrd})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const entrd = await entrada.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({entrd})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httpEntrada;