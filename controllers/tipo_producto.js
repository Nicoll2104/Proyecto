import tipo_producto from "../models/tipo_producto.js";

const httptipoproducto = {
    getTipoproducto: async (req,res)=>{
        const Tproducto = await tipo_producto.find()
        res.json(Tproducto);
    },

    getTipoproductoId: async (req,res)=>{
        const {id}=req.params
        try{
            const Tproducto = await tipo_producto.findById(id)
            res.json({Tproducto})
        }catch(error){
            res.status(400).json({error:'No encotramos el id'})
        }
    },

    postTipoproducto: async (req,res)=>{
        try{
            const {codigo, nombre}=req.body;
            const Tproducto = new tipo_producto({codigo, nombre});

            await Tproducto.save();
            res.json({mensaje:'El tipo de producto se agrego con exito', Tproducto })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putTipoproducto: async (req,res)=>{
        const {id}=req.params;
        const {codigo, nombre}=req.body;

        try{
            const Tproducto = await tipo_producto.findByIdAndUpdate(id,{codigo, nombre}, {new: true});
        
            if(!Tproducto){
                return res.status(404).json({mensaje:'El tipo de producto no existe' })
            }
            res.json({mensaje: 'Tipo de producto actualizado con éxito',Tproducto  })
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor'});
        }
    },

    deleteTipoproducto : async (req,res)=>{
        try{
            const {id} =req.params;
            const Tproducto = await tipo_producto.findByIdAndDelete(id);

            if(!Tproducto){
                return res.status(404).json({mensaje: 'El tipo de producto no existe' })
            }
            res.json({mensaje: 'El tipo de producto ha sido eliminado'})
        }catch(error){
            res.status(500).json({error: 'Ocurrió un error al intentar eliminar al tipo de producto' })
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Tproducto = await tipo_producto.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({Tproducto})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const Tproducto = await tipo_producto.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({Tproducto})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },
}
export default httptipoproducto;