import producto from "../models/producto.js";
import { generarJWT } from "../middlewares/validar.js";

const httpProducto = {
    getProducto: async (req,res)=>{
        const productos  = await producto.find()
        res.json(productos);
    },

    getProductoId: async (req,res)=>{
        const {id}= req.params
        try{
            const productos = await producto.findById(id)
            res.json({productos})
        }catch(error){
            res.status(400).json({error:'no encontramos el id del producto'})
        }
    },

    postProducto: async (req,res)=>{
        try{
            const {codigo, nombre, descripcion, unidad_medida,precio_unitario,impestos,fecha_creacion,fecha_vencimiento,id_tipo_producto}=req.body;
            const productos = new producto({codigo, nombre, descripcion, unidad_medida,precio_unitario,impestos,fecha_creacion,fecha_vencimiento,id_tipo_producto});

            await productos.save();
            res.json({mensaje:'El producto se agrego con exito', productos })
        }catch(error){
            res.status(500).json({error:'Error interno del servidor'})
        }
    },

    putProducto: async (req,res) =>{
        const {id} = req.params;
        const {codigo, nombre, descripcion, unidad_medida, precio_unitario, impestos, fecha_creacion,fecha_vencimiento,id_tipo_producto} = req.body;
    
        try{
            const productos  =await producto.findByIdAndUpdate(id, { codigo, nombre, descripcion, unidad_medida, precio_unitario, impestos, fecha_creacion,fecha_vencimiento,id_tipo_producto}, { new: true });

            if(!productos){
                return res.status(404).json({mensaje: 'El producto no existe' })
            }
            res.json({ mensaje: 'Producto actualizado con éxito', productos });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteProducto: async (req,res) =>{
        try{
            const {id} = req.params;
            const productos = await producto.findByIdAndDelete(id);

            if(!productos){
                return res.status(404).json({ mensaje: 'El producto no existe' });
            }
            res.json({ mensaje: 'El producto ha sido eliminado' });
        }catch(error){
            res.status(500).json({ error: 'Ocurrió un error al intentar eliminar al producto' });
        }
    },

    putInactivar: async (req, res) =>{
        try{
            const {id}=req.params
            const productos = await producto.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({productos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const productos = await producto.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({productos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
    
} 

export default httpProducto;