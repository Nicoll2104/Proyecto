import Producto from "../models/producto.js";

const httpProducto = {
    getProducto: async (req, res) => {
        try {
            const productos = await Producto.find().populate('lote'); // Cambiado 'producto' a 'Producto'
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    getProductoId: async (req, res) => {
        const { id } = req.params;
        try {
            const productos = await Producto.findById(id).populate('lote'); // Cambiado 'producto' a 'Producto'
            if (!productos) {
                return res.status(404).json({ mensaje: 'El producto no existe' });
            }
            res.json({ productos });
        } catch (error) {
            res.status(400).json({ error: 'No se encontró el ID del producto' });
        }
    },

    postProducto: async (req, res) => {
        try {
            const { codigo, nombre, descripcion, unidad_medida, precio_unitario, iva, cantidad, lote } = req.body;
            const productos = new Producto({ codigo, nombre, descripcion, unidad_medida, precio_unitario, iva, cantidad, lote }); // Cambiado 'producto' a 'Producto'

            const rLote = await Lote.findById(lote); // Debes tener el modelo de Lote importado y definido

            productos.lote = rLote;
            await productos.save();
            res.json({ mensaje: 'El producto se agregó con éxito', productos });
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    putProducto: async (req,res) =>{
        const {id} = req.params;
        const {codigo, nombre, descripcion, unidad_medida,precio_unitario,iva,cantidad,lote} = req.body;
    
        try{
            const productos  =await Producto.findByIdAndUpdate(id, { codigo, nombre, descripcion, unidad_medida,precio_unitario,iva,cantidad,lote}, { new: true });

            if(!productos){
                return res.status(404).json({mensaje: 'El producto no existe' })
            }

            const rLote = await lote.findById(lote)

            productos.lote = rLote
            await productos.save();
            res.json({ mensaje: 'Producto actualizado con éxito', productos });
        }catch(error){
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    deleteProducto: async (req,res) =>{
        try{
            const {id} = req.params;
            const productos = await Producto.findByIdAndDelete(id);

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
            const productos = await Producto.findByIdAndUpdate(id,{status:0},{new:true})
            res.json({productos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    },

    putActivar: async (req, res) =>{
        try{
            const {id}=req.params
            const productos = await Producto.findByIdAndUpdate(id,{status:1},{new:true})
            res.json({productos})
        }catch(error){
            res.status(400).json({error: 'Se produjo un error'})
        }
    }
    
} 

export default httpProducto;